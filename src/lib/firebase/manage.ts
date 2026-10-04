'use client';
import {collection,doc,getDoc,getDocs,runTransaction,deleteDoc,setDoc,writeBatch,type DocumentData} from 'firebase/firestore';
import {firebaseClient} from './client';
import {projectSchema} from '../validation';
import {seed} from '../seed';
import type {Project,Media} from '../model';
export async function listRecords<T>(name:string):Promise<T[]>{const {db}=firebaseClient();const result=await getDocs(collection(db,name));return result.docs.map(d=>({...d.data(),id:d.id})) as T[];}
export async function saveRecord(name:string,id:string,data:DocumentData){await setDoc(doc(firebaseClient().db,name,id),data);}
export async function saveContactSection(section:'profile'|'social'|'settings',content:DocumentData){
 const {db}=firebaseClient();
 const records=[{section:'profile',path:'site/profile',field:'email',fallback:seed.profile},{section:'social',path:'socialLinks/main',field:'email',fallback:seed.social},{section:'settings',path:'site/settings',field:'contactEmail',fallback:seed.settings}] as const;
 const email=section==='settings'?content.contactEmail:content.email;
 await runTransaction(db,async transaction=>{const snapshots=await Promise.all(records.map(record=>transaction.get(doc(db,record.path))));records.forEach((record,index)=>{const previous=snapshots[index].exists()?snapshots[index].data():record.fallback;transaction.set(doc(db,record.path),record.section===section?content:{...previous,[record.field]:email});});});
}
export async function removeRecord(name:string,id:string){await deleteDoc(doc(firebaseClient().db,name,id));}
export async function saveProject(input:Project){
 const p=projectSchema.parse({...input,updatedAt:new Date().toISOString()});const {db}=firebaseClient();
 await runTransaction(db,async t=>{const ref=doc(db,'projects',p.id),slug=doc(db,'slugs',p.slug);const [previous,claimed]=await Promise.all([t.get(ref),t.get(slug)]);
  if(claimed.exists()&&claimed.data().projectId!==p.id)throw new Error('This slug is already used. Choose a different public URL.');
  if(previous.exists()&&previous.data().slug!==p.slug)t.delete(doc(db,'slugs',previous.data().slug));
  t.set(slug,{projectId:p.id});t.set(ref,p);
 });return p;
}
export async function deleteProject(p:Project){const {db}=firebaseClient();await runTransaction(db,async t=>{const ref=doc(db,'projects',p.id),snapshot=await t.get(ref);if(snapshot.exists()){t.delete(doc(db,'slugs',snapshot.data().slug));t.delete(ref);}});}
export async function reorderRecords(name:string,ids:string[]){const {db}=firebaseClient(),batch=writeBatch(db);ids.forEach((id,i)=>batch.update(doc(db,name,id),{displayOrder:i,updatedAt:new Date().toISOString()}));await batch.commit();}
export async function importStarterContent(){
 const {db}=firebaseClient();const existing=await getDocs(collection(db,'projects'));
 if(!existing.empty)throw new Error('Starter import is only available when there are no projects. Existing content was not changed.');
 const batch=writeBatch(db);
 for(const project of seed.projects){const claim=await getDoc(doc(db,'slugs',project.slug));if(claim.exists()&&claim.data().projectId!==project.id)throw new Error(`The starter slug ${project.slug} is already claimed.`);batch.set(doc(db,'projects',project.id),projectSchema.parse(project));batch.set(doc(db,'slugs',project.slug),{projectId:project.id});}
 for(const [name,rows] of [['services',seed.services],['experience',seed.experience],['expertise',seed.expertise]] as const){const previous=await getDocs(collection(db,name));if(previous.empty)rows.forEach(entry=>batch.set(doc(db,name,entry.id),entry));}
 for(const [path,content] of [['site/profile',seed.profile],['site/seo',seed.seo],['site/settings',seed.settings],['socialLinks/main',seed.social]] as const){if(!(await getDoc(doc(db,path))).exists())batch.set(doc(db,path),content);}
 const library=await getDocs(collection(db,'media'));
 const existingImages=new Set(library.docs.map(snapshot=>snapshot.data().public_id));
 const starterImages=new Map<string,Media>();
 seed.projects.forEach(project=>{[project.logo,project.coverImage,...project.screenshots].forEach(image=>{if(image)starterImages.set(image.public_id,image);});});
 starterImages.forEach(image=>{if(!existingImages.has(image.public_id))batch.set(doc(db,'media',image.public_id.replaceAll('/','-')),{...image,createdAt:new Date().toISOString()});});
 await batch.commit();
}

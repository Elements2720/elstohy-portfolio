import 'server-only';
import {cache} from 'react';
import {seed} from './seed';
import {decodeFields,firestoreBase} from './firebase/rest';
import {profileSchema,projectSchema,entrySchema,settingsSchema,seoSchema,socialSchema} from './validation';
import type {Portfolio} from './model';
const apiKey=()=>process.env.FIREBASE_WEB_API_KEY||process.env.NEXT_PUBLIC_FIREBASE_API_KEY||'';
async function publicDocument(path:string){
 const res=await fetch(`${firestoreBase()}/${path}?key=${apiKey()}`,{cache:'no-store'});
 if(res.status===404)return null;if(!res.ok)throw new Error(`Public content unavailable (${res.status}).`);
 return decodeFields((await res.json()).fields??{});
}
async function publishedCollection(collection:string,field:string,value:string|boolean){
 const res=await fetch(`${firestoreBase()}:runQuery?key=${apiKey()}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({structuredQuery:{from:[{collectionId:collection}],where:{fieldFilter:{field:{fieldPath:field},op:'EQUAL',value:typeof value==='string'?{stringValue:value}:{booleanValue:value}}}}}),cache:'no-store'});
 if(!res.ok)throw new Error(`Public collection unavailable (${res.status}).`);
 const data=await res.json();return data.filter((r:{document?:unknown})=>r.document).map((r:{document:{name:string;fields:Parameters<typeof decodeFields>[0]}})=>({...decodeFields(r.document.fields),id:r.document.name.split('/').at(-1)}));
}
export const getPortfolio=cache(async():Promise<Portfolio>=>{
 if(!process.env.FIREBASE_PROJECT_ID&&!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)return seed;
 const rawSettings=await publicDocument('site/settings');const settings=settingsSchema.parse(rawSettings??seed.settings);
 if(!settings.sitePublished)return {...seed,settings,projects:[],services:[],experience:[],expertise:[]};
 const [profile,seo,social,projects,services,experience,expertise]=await Promise.all([publicDocument('site/profile'),publicDocument('site/seo'),publicDocument('socialLinks/main'),publishedCollection('projects','status','published'),publishedCollection('services','published',true),publishedCollection('experience','published',true),publishedCollection('expertise','published',true)]);
 const sort=<T extends {displayOrder:number}>(a:T[])=>a.sort((x,y)=>x.displayOrder-y.displayOrder);
 return {settings,profile:profileSchema.parse(profile??seed.profile),seo:seoSchema.parse(seo??seed.seo),social:socialSchema.parse(social??seed.social),projects:settings.defaultProjectSort==='newest'?projects.map((p:unknown)=>projectSchema.parse(p)).sort((a:{createdAt:string},b:{createdAt:string})=>b.createdAt.localeCompare(a.createdAt)):sort(projects.map((p:unknown)=>projectSchema.parse(p))),services:sort(services.map((p:unknown)=>entrySchema.parse(p))),experience:sort(experience.map((p:unknown)=>entrySchema.parse(p))),expertise:sort(expertise.map((p:unknown)=>entrySchema.parse(p)))};
});

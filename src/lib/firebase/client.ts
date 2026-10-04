'use client';
import {initializeApp,getApps} from 'firebase/app';
import {getAuth,connectAuthEmulator} from 'firebase/auth';
import {getFirestore,connectFirestoreEmulator} from 'firebase/firestore';
export const firebaseConfigured=Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY&&process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
export function firebaseClient(){
 if(!firebaseConfigured)throw new Error('Firebase is not configured. Add the public Firebase variables to .env.local.');
 const existing=getApps()[0];
 const app=existing??initializeApp({apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID});
 if(!existing&&process.env.NODE_ENV==='development'){
  if(process.env.NEXT_PUBLIC_AUTH_EMULATOR_URL)connectAuthEmulator(getAuth(app),process.env.NEXT_PUBLIC_AUTH_EMULATOR_URL,{disableWarnings:true});
  if(process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_HOST)connectFirestoreEmulator(getFirestore(app),process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_HOST,8080);
 }
 return {auth:getAuth(app),db:getFirestore(app)};
}

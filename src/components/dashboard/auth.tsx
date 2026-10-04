'use client';
import {createContext,useContext,useEffect,useState,type ReactNode} from 'react';
import {onAuthStateChanged,signOut,type User} from 'firebase/auth';
import {doc,getDoc} from 'firebase/firestore';
import {firebaseClient,firebaseConfigured} from '@/lib/firebase/client';
type AuthState={user:User|null;admin:boolean;loading:boolean;error:string;logout:()=>Promise<void>};
const Context=createContext<AuthState>({user:null,admin:false,loading:true,error:'',logout:async()=>{}});
export function AuthProvider({children}:{children:ReactNode}){
 const [state,setState]=useState<Omit<AuthState,'logout'>>({user:null,admin:false,loading:true,error:''});
 useEffect(()=>{if(!firebaseConfigured){setState({user:null,admin:false,loading:false,error:'Firebase is not configured. Complete the environment setup to enable owner login.'});return;}
  const {auth,db}=firebaseClient();let generation=0;
  const unsubscribe=onAuthStateChanged(auth,async user=>{const current=++generation;setState({user,admin:false,loading:true,error:''});if(!user){setState({user:null,admin:false,loading:false,error:''});return;}
   try{const snapshot=await getDoc(doc(db,'admins',user.uid));if(current!==generation)return;setState({user,admin:snapshot.exists()&&snapshot.data().enabled===true,loading:false,error:snapshot.exists()&&snapshot.data().enabled===true?'':'This account is not an authorized administrator.'});}catch{if(current===generation)setState({user,admin:false,loading:false,error:'Could not verify administrator access. Check your connection and sign in again.'});}
  });return()=>{generation++;unsubscribe();};
 },[]);
 return <Context.Provider value={{...state,logout:async()=>{await signOut(firebaseClient().auth);}}}>{children}</Context.Provider>;
}
export const useAdmin=()=>useContext(Context);

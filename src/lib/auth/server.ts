import {createRemoteJWKSet,jwtVerify} from 'jose';
import {firestoreBase,decodeFields} from '../firebase/rest';
const keys=createRemoteJWKSet(new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'));
export class AuthError extends Error{constructor(public status:number,message:string){super(message);}}
export async function requireAdmin(request:Request){
 const header=request.headers.get('authorization');
 if(!header?.startsWith('Bearer '))throw new AuthError(401,'Sign in to continue.');
 const token=header.slice(7),project=process.env.FIREBASE_PROJECT_ID||process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,apiKey=process.env.FIREBASE_WEB_API_KEY||process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
 if(!project||!apiKey)throw new AuthError(503,'Authentication service is not configured.');
 let uid:string;
 try{
  const {payload}=await jwtVerify(token,keys,{issuer:`https://securetoken.google.com/${project}`,audience:project,algorithms:['RS256']});
  if(!payload.sub||payload.sub.length>128||!payload.auth_time||Number(payload.auth_time)>Date.now()/1000)throw new Error('Invalid subject.');
  uid=payload.sub;
  // Lookup also rejects disabled accounts and invalidated sessions independently of the browser guard.
  const account=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({idToken:token})});
  if(!account.ok)throw new Error('Invalid session.');const result=await account.json();const user=result.users?.[0];
  if(!user||user.localId!==uid||user.disabled||Number(user.validSince)>Number(payload.auth_time))throw new Error('Revoked session.');
 }catch{throw new AuthError(401,'Your session expired. Sign in again.');}
 const admin=await fetch(`${firestoreBase()}/admins/${encodeURIComponent(uid)}`,{headers:{Authorization:`Bearer ${token}`},cache:'no-store'});
 if(!admin.ok)throw new AuthError(403,'Administrator access required.');
 const data=decodeFields((await admin.json()).fields??{});
 if(data.enabled!==true)throw new AuthError(403,'Administrator access required.');
 return {uid,token};
}

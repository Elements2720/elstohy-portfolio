'use client';
import {useState,useEffect,type FormEvent} from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import {firebaseClient,firebaseConfigured} from '@/lib/firebase/client';
import {useAdmin} from '@/components/dashboard/auth';
export default function Login(){const [email,setEmail]=useState(''),[password,setPassword]=useState(''),[busy,setBusy]=useState(false),[message,setMessage]=useState(''),{admin,error,loading,user,logout}=useAdmin(),router=useRouter();
 useEffect(()=>{if(admin)router.replace('/dashboard');},[admin,router]);
 async function submit(e:FormEvent){e.preventDefault();setBusy(true);setMessage('');try{await signInWithEmailAndPassword(firebaseClient().auth,email,password);}catch{setMessage('Could not sign in. Check your email and password, then try again.');}finally{setBusy(false);}}
 return <main className="admin-login"><Link href="/" className="admin-brand">El-Stohy<span>PORTFOLIO STUDIO</span></Link><div className="login-panel"><h1>Welcome back.</h1><p>Sign in to manage your portfolio.</p>{!firebaseConfigured?<div className="admin-alert">Owner login requires Firebase configuration. Follow the setup guide in README.md.</div>:<form onSubmit={submit}><label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="username"/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="current-password"/></label>{(message||error)&&<div className="admin-alert" role="alert">{message||error}</div>}<button className="admin-button" type="submit" disabled={busy||loading}>{busy||loading?'Signing in…':'Sign in'}</button>{user&&!admin&&<button className="admin-button secondary" type="button" onClick={()=>logout()}>Use a different account</button>}</form>}<Link href="/" className="admin-text-link">← Back to portfolio</Link></div></main>;
}

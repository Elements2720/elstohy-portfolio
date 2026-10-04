'use client';
import {usePathname,useRouter} from 'next/navigation';
import Link from 'next/link';
import {useEffect,useState,type ReactNode} from 'react';
import {Menu,X,ArrowUpRight,LogOut} from 'lucide-react';
import {AuthProvider,useAdmin} from './auth';
const sections=[['','Overview'],['profile','Profile'],['projects','Projects'],['services','Services'],['experience','Experience'],['expertise','Expertise'],['social','Social Links'],['media','Media'],['seo','SEO'],['settings','Settings']];
function Shell({children}:{children:ReactNode}){const {user,admin,loading,error,logout}=useAdmin(),path=usePathname(),router=useRouter(),[open,setOpen]=useState(false),isLogin=path==='/dashboard/login';
 useEffect(()=>{if(!loading&&!user&&!isLogin)router.replace('/dashboard/login');},[loading,user,isLogin,router]);
 useEffect(()=>{if(!open)return;const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'){setOpen(false);document.querySelector<HTMLButtonElement>('.admin-mobile-toggle')?.focus();}};document.addEventListener('keydown',escape);return()=>document.removeEventListener('keydown',escape);},[open]);
 useEffect(()=>{const media=matchMedia('(max-width:650px)');const resize=()=>{if(!media.matches)setOpen(false);};media.addEventListener('change',resize);return()=>media.removeEventListener('change',resize);},[]);
 if(isLogin)return children;
 if(loading)return <div className="admin-state" role="status">Checking owner access…</div>;
 if(!admin)return <div className="admin-state"><h1>{user?'Access restricted':'Owner dashboard'}</h1><p>{error||'Redirecting to sign in…'}</p>{user&&<button className="admin-button" onClick={()=>logout()}>Sign out</button>}</div>;
 return <div className="admin-shell"><button className="admin-mobile-toggle" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="dashboard-navigation" aria-label="Toggle dashboard navigation">{open?<X/>:<Menu/>} Dashboard</button><aside id="dashboard-navigation" className={`admin-sidebar ${open?'is-open':''}`}><Link href="/dashboard" className="admin-brand">El-Stohy<span>PORTFOLIO STUDIO</span></Link><nav aria-label="Dashboard navigation">{sections.map(([slug,label])=>{const href=`/dashboard${slug?'/'+slug:''}`;return <Link href={href} key={label} className={path===href||(slug&&path.startsWith(`${href}/`))?'active':''} onClick={()=>setOpen(false)}>{label}</Link>;})}</nav><div className="sidebar-bottom"><Link href="/" target="_blank">View portfolio <ArrowUpRight size={15}/></Link><button onClick={()=>logout()}><LogOut size={15}/> Sign out</button></div></aside><main className="admin-main" inert={open||undefined}>{children}</main></div>;
}
export function DashboardShell({children}:{children:ReactNode}){return <AuthProvider><Shell>{children}</Shell></AuthProvider>;}

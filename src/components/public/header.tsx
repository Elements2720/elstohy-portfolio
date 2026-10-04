'use client';
import Link from 'next/link';
import {useState,useEffect} from 'react';
import {AnimatePresence,motion} from 'motion/react';
export function VisitorLocalClock(){
 const [time,setTime]=useState('--:--:--');
 useEffect(()=>{const formatter=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'});const update=()=>setTime(formatter.format(new Date()));update();const timer=setInterval(update,1000);return()=>clearInterval(timer);},[]);
 return <span className="local-clock"><span>LOCAL/</span><time>{time}</time></span>;
}
export function Header(){const [open,setOpen]=useState(false);
 useEffect(()=>{if(!open)return;const close=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false);};document.addEventListener('keydown',close);return()=>document.removeEventListener('keydown',close);},[open]);
 return <><header className="public-header" id="top"><VisitorLocalClock/><button className="dot-menu" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="public-navigation" onClick={()=>setOpen(!open)}><span/><span/><span/><span/></button><Link className="pill outline" href="/#contact"><span className="desktop-contact">CONTACT NOW</span><span className="mobile-contact">CONTACT</span></Link></header>
 <AnimatePresence>{open&&<motion.nav className="public-navigation" id="public-navigation" aria-label="Main navigation" initial={{height:0}} animate={{height:'auto'}} exit={{height:0}} transition={{duration:.35}}>{['Work','Profile','Services','Experience','Contact'].map((label,i)=><Link key={label} href={`/#${label.toLowerCase()}`} onClick={()=>setOpen(false)}><span>0{i+1}</span>{label}<span>↗</span></Link>)}</motion.nav>}</AnimatePresence></>;
}

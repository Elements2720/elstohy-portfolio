'use client';
import {motion,useMotionValue,useSpring,useScroll,useTransform,useReducedMotion,MotionConfig} from 'motion/react';
import {useEffect,useRef,useState,type ReactNode} from 'react';
import type {Media,Project} from '@/lib/model';
import {responsiveMedia} from '@/lib/images';
function useHydrationSafeReducedMotion(){const preference=useReducedMotion(),[hydrated,setHydrated]=useState(false);useEffect(()=>setHydrated(true),[]);return hydrated&&Boolean(preference);}
export function PublicMotion({children}:{children:ReactNode}){return <MotionConfig reducedMotion="user">{children}<Cursor/></MotionConfig>;}
export function Reveal({children,className='',delay=0}:{children:ReactNode;className?:string;delay?:number}){
 const reduced=useHydrationSafeReducedMotion();
 return <motion.div className={`reveal ${className}`} initial={false} whileInView={reduced?{}:{clipPath:['inset(0 0 18% 0)','inset(0 0 0% 0)'],y:[28,0]}} viewport={{once:true,amount:.18}} transition={{duration:.9,delay,ease:[.22,1,.36,1]}}>{children}</motion.div>;
}
export function Identity({word,name}:{word:string;name:string}){
 const ref=useRef<HTMLHeadingElement>(null),reduced=useHydrationSafeReducedMotion(),[ready,setReady]=useState(false);
 useEffect(()=>setReady(true),[]);
 useEffect(()=>{const el=ref.current;if(!el)return;const fit=()=>{el.style.fontSize='300px';const text=el.querySelector('span')!;const scale=(el.clientWidth-12)/text.scrollWidth;el.style.fontSize=`${Math.min(420,300*scale)}px`;};document.fonts.ready.then(fit);const observer=new ResizeObserver(fit);observer.observe(el);return()=>observer.disconnect();},[word]);
 return <div className="identity-band"><h1 ref={ref} aria-label={name}><span>{[...word].map((letter,index)=><motion.span key={index} style={{display:'inline-block'}} initial={false} animate={ready&&!reduced?{clipPath:['inset(100% 0 0 0)','inset(0% 0 0 0)'],y:[35,0]}:{clipPath:'inset(0% 0 0 0)',y:0}} transition={{duration:reduced?0:1,delay:reduced?0:index*.035,ease:[.22,1,.36,1]}}>{letter}</motion.span>)}</span></h1><span className="identity-caption">{name}</span></div>;
}
export function ProfileHeading(){
 const ref=useRef<HTMLDivElement>(null),reduced=useHydrationSafeReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start start','end start']});
 const opacity=useTransform(scrollYProgress,[0,.35,.8],[1,1,0]);
 const scale=useTransform(scrollYProgress,[0,1],[1,.94]);
 return <div className="profile-heading" ref={ref}><motion.h2 style={reduced?{}:{opacity,scale}}><span>MORE ABOUT</span><br/>EL-STOHY©</motion.h2></div>;
}
export function Artwork({images,title,hero=false,logo=false,cover=false}:{images:Media[];title:string;hero?:boolean;logo?:boolean;cover?:boolean}){
 const ref=useRef<HTMLDivElement>(null),reduced=useHydrationSafeReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
 const y=useTransform(scrollYProgress,[0,1],hero?[60,-60]:[35,-35]);
 const scale=useTransform(scrollYProgress,[0,1],hero?[1.04,1.13]:[1.02,1.08]);
 return <div ref={ref} className={`artwork ${hero?'hero-artwork':''} ${logo?'logo-artwork':''} ${cover?'cover-artwork':''}`}>
  <motion.div className="artwork-inner" style={reduced?{}:{y,scale}} whileHover={reduced?{}:{scale:1.12}} transition={{duration:.65,ease:[.22,1,.36,1]}}>
   {images.slice(0,hero?4:3).map((image,i)=><img key={image.public_id} {...responsiveMedia(image,cover?'(max-width:600px) 95vw, 80vw':'(max-width:600px) 45vw, 30vw')} alt={`${title} ${logo?'project logo':`app screen ${i+1}`}`} width={image.width} height={image.height} loading={hero&&i===0?'eager':'lazy'} fetchPriority={hero&&i===0?'high':'auto'} decoding="async"/>)}
  </motion.div>
  {!logo&&!cover&&<span className="artwork-mark" aria-hidden="true">{title.toUpperCase()} / MOBILE PRODUCT</span>}
 </div>;
}
export function ProjectArtwork({project}:{project:Project}){
 const primary=project.coverImage;
 const landscape=!!primary&&primary.width>=primary.height;
 const logo=!!primary&&primary.public_id===project.logo?.public_id&&!project.screenshots.length;
 const images=primary?[primary,...(landscape?[]:project.screenshots.filter(image=>image.public_id!==primary.public_id).slice(0,2))]:project.screenshots;
 return <Artwork images={images} title={project.title} logo={logo} cover={landscape&&!logo}/>;
}
function Cursor(){
 const x=useMotionValue(-100),y=useMotionValue(-100),sx=useSpring(x,{stiffness:350,damping:30}),sy=useSpring(y,{stiffness:350,damping:30});
 const [active,setActive]=useState(false),reduced=useHydrationSafeReducedMotion();
 useEffect(()=>{if(reduced||!matchMedia('(pointer:fine)').matches)return;const move=(e:PointerEvent)=>{x.set(e.clientX);y.set(e.clientY);setActive(Boolean((e.target as HTMLElement).closest('[data-work]')));};const leave=()=>{setActive(false);x.set(-100);y.set(-100);};window.addEventListener('pointermove',move);document.addEventListener('pointerleave',leave);return()=>{window.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',leave);};},[reduced,x,y]);
 if(reduced)return null;
 return <motion.div className="work-cursor" aria-hidden="true" style={{left:sx,top:sy}} animate={{width:active?98:7,height:active?48:7,opacity:1}} transition={{duration:.2}}>{active?'VIEW':''}</motion.div>;
}

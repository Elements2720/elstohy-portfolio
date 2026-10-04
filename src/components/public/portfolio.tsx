import Link from 'next/link';
import {Globe,Code2,BadgeCheck,ArrowUpRight,ArrowRight,Apple,Play} from 'lucide-react';
import type {Portfolio,Project,Media,Profile,Settings,Entry} from '@/lib/model';
import {responsiveMedia} from '@/lib/images';
import {Header} from './header';
import {PublicMotion,Identity,Artwork,ProjectArtwork,ProfileHeading,Reveal} from './motion';

export function Rail({number,label,note}:{number:string;label:string;note:string}){
 return <div className="section-rail"><span>{number}</span><span>//{label}</span><span>{note}</span></div>;
}
export function PublicFrame({children}:{children:React.ReactNode}){
 return <div className="portfolio"><a className="skip-link" href="#main">Skip to content</a><PublicMotion><Header/>{children}</PublicMotion></div>;
}
export function StoreLinks({iosUrl,androidUrl,websiteUrl,githubUrl}:{iosUrl?:string;androidUrl?:string;websiteUrl?:string;githubUrl?:string}){
 return <div className="store-links">
  {iosUrl&&<a href={iosUrl} target="_blank" rel="noopener noreferrer"><Apple size={19}/> App Store <ArrowUpRight size={15}/></a>}
  {androidUrl&&<a href={androidUrl} target="_blank" rel="noopener noreferrer"><Play size={17}/> Google Play <ArrowUpRight size={15}/></a>}
  {websiteUrl&&<a href={websiteUrl} target="_blank" rel="noopener noreferrer">Website <ArrowUpRight size={15}/></a>}
  {githubUrl&&<a href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={15}/></a>}
 </div>;
}
export function WorkItem({project,index}:{project:Project;index:number}){
 return <Link href={`/work/${project.slug}`} className={`work-item work-item-${index%5}`} data-work="true"><ProjectArtwork project={project}/><div className="work-caption">
  <span className="work-dots" aria-hidden="true">{[0,1,2,3,4].map(dot=><i key={dot} className={dot<=index%5?'active':''}/>)}</span>
  <div><h3>{project.title}</h3><span>{project.category} / {project.platforms.join(' + ')}</span></div><ArrowRight size={22}/>
 </div></Link>;
}
export function Contact({data:portfolio}:{data:Portfolio}){
 const email=portfolio.settings.contactEmail||portfolio.profile.email;
 return <><section className="contact-section" id="contact">
  <Reveal><h2>LET’S WORK<br/>TOGETHER</h2></Reveal><a className="pill" href={`mailto:${email}`}>CONTACT NOW <ArrowUpRight size={16}/></a>
  <div className="contact-meta"><span>{portfolio.profile.availabilityText}</span><span>{portfolio.profile.headline}<br/><span className="muted">{portfolio.profile.secondaryHeadline}</span></span></div>
  <div className="contact-copy"><h3>{portfolio.profile.shortBio}</h3><a className="email-link" href={`mailto:${email}`}>{email}</a><div className="social-links">
   {portfolio.social.linkedin&&<a href={portfolio.social.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a>}
   {portfolio.social.github&&<a href={portfolio.social.github} target="_blank" rel="noopener noreferrer">GITHUB ↗</a>}
   {portfolio.social.other.map(link=><a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}
  </div></div><div className="footer-identity" aria-hidden="true">EL-STOHY</div>
 </section><footer className="public-footer"><span>© {new Date().getFullYear()} {portfolio.profile.displayName}</span><a href="#top">BACK TO TOP ↑</a></footer></>;
}
function MiniMedia({images}:{images:Media[]}){
 return <div className="mini-media">{images.map((image,index)=><img key={image.public_id} src={image.secure_url} width={44} height={44} alt={`Project artwork ${index+1}`} loading="lazy"/>)}</div>;
}
type IdentityContent={profile:Profile;projects:Project[]};
function HeroSection({profile,projects}:IdentityContent){
 const heroImages=profile.heroImage?[profile.heroImage,...(projects.find(project=>project.coverImage?.public_id===profile.heroImage?.public_id)?.screenshots.slice(1,4)??[])]:projects[0]?.screenshots??[];
 return <section className="hero"><Identity word={profile.heroWord} name={profile.displayName}/><div className="hero-metadata">
  <div><Code2 className="green" size={22}/><span>{profile.displayName}<br/><span className="muted">MOBILE ENGINEER</span></span></div>
  <div><Globe size={29}/><span>{profile.availabilityText}<br/><span className="muted">OPEN FOR SELECT PROJECTS</span></span></div>
  <div><BadgeCheck className="blue" size={22}/><span>{profile.headline}<br/><span className="muted">{profile.secondaryHeadline}</span></span></div>
 </div><div className="hero-media-wrap">{heroImages.length>0&&<Artwork images={heroImages} title="Selected mobile products" hero/>}</div></section>;
}
function ApproachSection({profile,projects}:IdentityContent){
 const phases=[['Product Engineering','From requirements and product flows to production applications on both stores.'],['Architecture & Quality','Modular codebases, Clean Architecture and predictable state, built to evolve.'],['Technical Leadership','Architecture ownership, thoughtful code review and mentoring developers.']];
 return <section className="approach-section" id="approach"><Rail number="01" label="APPROACH" note="THREE PHASES"/>
  <Reveal className="approach-intro"><h2>I BUILD MOBILE PRODUCTS<br/>THAT SHIP. AND LAST.</h2><p>{profile.shortBio}</p></Reveal>
  <div className="phase-line">{phases.map((_,index)=><span key={index}>0{index+1}</span>)}</div><div className="approach-grid">
   {phases.map(([title,description],index)=><div key={title}><span className="phase-dots" aria-hidden="true">{[0,1,2].map(dot=><i key={dot} className={dot<=index?'on':''}/>)}</span><MiniMedia images={projects.slice(index,index+3).map(project=>project.coverImage).filter((image):image is Media=>!!image)}/><h3>{title}</h3><p>{description}</p></div>)}
  </div></section>;
}
function WorkSection({projects}:{projects:Project[]}){
 const featured=projects.filter(project=>project.featured);
 return <section className="work-section" id="work"><Rail number="02" label="PORTFOLIO" note="SELECTED PRODUCTS"/>
  <div className="section-heading"><Reveal><h2>LATEST<br/>PORTFOLIO</h2></Reveal><p>Mobile products, connected ecosystems and the engineering behind them.</p></div>
  <div className="work-grid">{(featured.length?featured:projects).map((project,index)=><WorkItem key={project.id} project={project} index={index}/>)}</div>
  {!projects.length&&<p className="public-empty">Selected work is being updated. Let’s talk about your next mobile product.</p>}
 </section>;
}
function ProfileSection({profile,settings}:{profile:Profile;settings:Settings}){
 return <section className="profile-section" id="profile"><Rail number="03" label="WHO AM I" note="MOBILE ENGINEERING"/><ProfileHeading/>
  {profile.portrait?<img className="portrait" {...responsiveMedia(profile.portrait,'(max-width:600px) 90vw, 504px')} width={profile.portrait.width} height={profile.portrait.height} alt={profile.displayName} loading="lazy"/>:<div className="profile-typography" aria-label={profile.displayName}><span>ME.</span><div>{profile.displayName}<br/><span>FLUTTER / DART</span></div></div>}
  <h3>{profile.shortBio}</h3><p>{profile.about}</p>
  {settings.resumeEnabled&&profile.resumeSanitized&&profile.resumeUrl&&<a className="pill" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">DOWNLOAD RESUME</a>}
 </section>;
}
function ServicesSection({services}:{services:Entry[]}){
 return <section className="services-section" id="services"><Rail number="04" label="SERVICES" note="FROM IDEA TO RELEASE"/>
  <div className="section-heading"><Reveal><h2>PRO<br/>SERVICES</h2></Reveal><p>Thoughtful engineering for your next mobile product, or the one you already have.</p></div>
  <div className="editorial-split"><div className="sticky-aside"><span className="oversized-asterisk" aria-hidden="true">✳</span><p>Build better.<br/>Ship with confidence.</p></div><div className="editorial-rows">
   {services.map((service,index)=><details key={service.id}><summary><span className="row-number">{String(index+1).padStart(2,'0')}</span><div><h3>{service.title}</h3><p>{service.shortDescription}</p></div><span className="row-plus">+</span></summary><p className="row-detail">{service.details||service.shortDescription}</p></details>)}
  </div></div></section>;
}
function ExpertiseSection({expertise}:{expertise:Entry[]}){
 return <section className="expertise-section" id="expertise"><Rail number="05" label="EXPERTISE" note="CURATED TOOLKIT"/>
  <div className="expertise-marquee" aria-hidden="true"><span>FLUTTER / DART / ARCHITECTURE / DELIVERY / </span></div>
  <div className="editorial-split"><h2 className="sticky-aside compact-title">STACK<br/>& CRAFT</h2><div className="editorial-rows">{expertise.map(entry=><div className="expertise-row" key={entry.id}><h3>{entry.title}</h3><p>{entry.description}</p></div>)}</div></div>
 </section>;
}
function ExperienceSection({experience}:{experience:Entry[]}){
 return <section className="experience-section" id="experience"><Rail number="06" label="EXPERIENCE" note="2021 — PRESENT"/>
  <div className="editorial-split"><h2 className="sticky-aside compact-title">EXPERIENCE</h2><div className="editorial-rows">
   {experience.map(entry=><div className="experience-row" key={entry.id}><div><h3>{entry.title}</h3><span>{entry.startDate} — {entry.endDate||'PRESENT'}</span></div><p>{entry.summary}</p>{entry.highlights.length>0&&<ul>{entry.highlights.map(highlight=><li key={highlight}>{highlight}</li>)}</ul>}</div>)}
  </div></div></section>;
}
export function Home({data:portfolio}:{data:Portfolio}){
 return <PublicFrame><main id="main"><HeroSection profile={portfolio.profile} projects={portfolio.projects}/><ApproachSection profile={portfolio.profile} projects={portfolio.projects}/><WorkSection projects={portfolio.projects}/><ProfileSection profile={portfolio.profile} settings={portfolio.settings}/><ServicesSection services={portfolio.services}/><ExpertiseSection expertise={portfolio.expertise}/><ExperienceSection experience={portfolio.experience}/><Contact data={portfolio}/></main></PublicFrame>;
}

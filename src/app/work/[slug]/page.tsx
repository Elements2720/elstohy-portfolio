import {notFound} from 'next/navigation';
import {getPortfolio} from '@/lib/content';
import {pageMetadata} from '@/lib/seo';
import {PublicFrame,Contact,StoreLinks,WorkItem} from '@/components/public/portfolio';
import {ProjectArtwork,Reveal} from '@/components/public/motion';
import type {Media,Project} from '@/lib/model';
import {responsiveMedia} from '@/lib/images';

export const dynamic='force-dynamic';
type PageProps={params:Promise<{slug:string}>};
export async function generateMetadata({params}:PageProps){
 const {slug}=await params,portfolio=await getPortfolio();
 const project=portfolio.projects.find(project=>project.slug===slug);
 if(!project||!portfolio.settings.sitePublished)notFound();
 return pageMetadata(portfolio,project);
}
function Gallery({images,title}:{images:Media[];title:string}){
 if(!images.length)return null;
 return <div className="project-gallery">{images.map((image,index)=><img key={image.public_id} {...responsiveMedia(image,'(max-width:600px) 42vw, 28vw')} alt={`${title} app screen ${index+1}`} width={image.width} height={image.height} loading="lazy"/>)}</div>;
}
function Passage({title,children}:{title:string;children:React.ReactNode}){
 return <div className="project-passage"><h2>{title}</h2>{children}</div>;
}
function ProjectNarrative({project}:{project:Project}){
 const labels:Record<string,string>={overview:'Overview',problem:'The problem',myRole:'My role',architecture:'Architecture',technicalChallenges:'Technical challenges',whatIBuilt:'What I built',integrations:'Integrations',results:'Results'};
 const sections=project.projectType==='case-study'?Object.entries(project.caseStudy).filter(([,text])=>text.trim()):[];
 return <div className="project-passages">
  {project.fullDescription&&<Passage title="Overview"><p>{project.fullDescription}</p></Passage>}
  {project.technologies.length>0&&<Passage title="Technologies"><p>{project.technologies.join(' / ')}</p></Passage>}
  {project.contributions.length>0&&<Passage title="What I built"><ul>{project.contributions.map(contribution=><li key={contribution}>{contribution}</li>)}</ul></Passage>}
  {project.challenges.length>0&&<Passage title="Engineering challenges"><ul>{project.challenges.map(challenge=><li key={challenge}>{challenge}</li>)}</ul></Passage>}
  {sections.map(([key,text])=><Passage key={key} title={labels[key]}><p>{text}</p></Passage>)}
 </div>;
}
function ProjectSuite({project}:{project:Project}){
 if(!project.apps.length)return null;
 return <section className="project-suite" id="project-suite"><h2>ONE PRODUCT.<br/>CONNECTED APPS.</h2>{project.apps.map((app,index)=><div className="project-app" key={app.id}>
  <div className="project-app-heading"><div>
   {app.logo&&<img className="project-app-logo" src={app.logo.secure_url} width={64} height={64} alt={`${app.name} logo`}/>}
   <h3>{String(index+1).padStart(2,'0')} / {app.name}</h3><p>{app.type} — {app.platforms.join(' / ')}</p>
  </div><StoreLinks iosUrl={app.iosUrl} androidUrl={app.androidUrl} websiteUrl={app.websiteUrl}/></div>
  <Gallery images={app.screenshots} title={app.name}/>
 </div>)}</section>;
}
export default async function ProjectPage({params}:PageProps){
 const {slug}=await params,portfolio=await getPortfolio();
 const project=portfolio.projects.find(project=>project.slug===slug);
 if(!project||!portfolio.settings.sitePublished)notFound();
 const metadata=[['Year',project.startDate],['Role',project.role],['Category',project.category],['Platforms',project.platforms.join(' / ')]];
 return <PublicFrame><main id="main">
  <section className="project-opening"><span>{project.startDate} / {project.category}</span><Reveal><h1>{project.title}</h1></Reveal>
   {project.logo&&<img className="project-app-logo" style={{margin:'20px auto'}} src={project.logo.secure_url} width={64} height={64} alt={`${project.title} project logo`}/>}
   <p>{project.shortDescription}</p><StoreLinks iosUrl={project.iosUrl} androidUrl={project.androidUrl} websiteUrl={project.websiteUrl} githubUrl={project.githubUrl}/>{project.apps.length>0&&<a className="pill" href="#project-suite">EXPLORE THE APPS</a>}
  </section>
  {project.coverImage&&<div className="project-cover"><ProjectArtwork project={project}/></div>}
  <dl className="project-metadata">{metadata.map(([label,text])=>text&&<div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}</dl>
  <ProjectNarrative project={project}/><ProjectSuite project={project}/><Gallery images={project.screenshots} title={project.title}/>
  <section className="more-work"><h2>MORE WORKS</h2><div>{portfolio.projects.filter(other=>other.id!==project.id).slice(0,2).map((project,index)=><WorkItem project={project} index={index} key={project.id}/>)}</div></section>
  <Contact data={portfolio}/>
 </main></PublicFrame>;
}

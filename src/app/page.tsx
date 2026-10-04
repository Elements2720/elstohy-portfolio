import {getPortfolio} from '@/lib/content';
import {pageMetadata,baseUrl} from '@/lib/seo';
import {Home,PublicFrame} from '@/components/public/portfolio';
export const dynamic='force-dynamic';
export async function generateMetadata(){return pageMetadata(await getPortfolio());}
export default async function Page(){const data=await getPortfolio();if(!data.settings.sitePublished)return <PublicFrame><main id="main" className="public-error"><h1>BACK SOON.</h1><p>This portfolio is being updated.</p></main></PublicFrame>;
 const person={'@context':'https://schema.org','@type':'Person',name:data.profile.displayName,jobTitle:data.profile.headline,url:baseUrl(data),...(data.profile.portrait?{image:data.profile.portrait.secure_url}:{}),sameAs:[data.social.linkedin,data.social.github].filter(Boolean)};
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(person).replace(/</g,'\\u003c')}}/><Home data={data}/></>;}

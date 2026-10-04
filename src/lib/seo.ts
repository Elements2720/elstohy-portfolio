import type {Metadata} from 'next';
import type {Portfolio,Project} from './model';
export function baseUrl(data:Portfolio){return data.seo.canonicalBaseUrl||process.env.SITE_URL||'http://localhost:3000';}
export function pageMetadata(data:Portfolio,project?:Project):Metadata{
 const origin=baseUrl(data),title=project?(project.seoTitle||`${project.title} — ${data.profile.displayName}`):data.seo.siteTitle,description=project?(project.seoDescription||project.shortDescription):data.seo.defaultDescription,image=project?.ogImage??project?.coverImage??data.seo.defaultOgImage;
 const canonical=project?`${origin}/work/${project.slug}`:origin;
 return {metadataBase:new URL(origin),title,description,alternates:{canonical},robots:{index:data.settings.sitePublished,follow:data.settings.sitePublished},openGraph:{title:project?title:data.seo.socialPreviewTitle||title,description,url:canonical,type:'website',...(image?{images:[{url:image.secure_url,width:image.width,height:image.height,alt:project?.title||data.profile.displayName}]}:{})},twitter:{card:'summary_large_image',title,description,...(image?{images:[image.secure_url]}:{})}};
}

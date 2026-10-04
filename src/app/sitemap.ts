import type {MetadataRoute} from 'next';
import {getPortfolio} from '@/lib/content';
import {baseUrl} from '@/lib/seo';
export const dynamic='force-dynamic';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const data=await getPortfolio();if(!data.settings.sitePublished)return [];const base=baseUrl(data);return [{url:base,changeFrequency:'weekly',priority:1},...data.projects.map(p=>({url:`${base}/work/${p.slug}`,lastModified:p.updatedAt,priority:.8}))];}

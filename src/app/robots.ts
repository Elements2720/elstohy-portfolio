import type {MetadataRoute} from 'next';
import {getPortfolio} from '@/lib/content';
import {baseUrl} from '@/lib/seo';
export const dynamic='force-dynamic';
export default async function robots():Promise<MetadataRoute.Robots>{const portfolio=await getPortfolio();return {rules:{userAgent:'*',allow:'/',disallow:['/dashboard','/api/']},sitemap:`${baseUrl(portfolio)}/sitemap.xml`};}

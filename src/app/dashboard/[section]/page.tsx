import {notFound} from 'next/navigation';
import {EntryManager} from '@/components/dashboard/entries';
import {SettingsEditor} from '@/components/dashboard/settings';
import {MediaLibrary} from '@/components/dashboard/media';
import {PageHeading} from '@/components/dashboard/forms';
export default async function Section({params}:{params:Promise<{section:string}>}){const {section}=await params;if(section==='services'||section==='experience'||section==='expertise')return <EntryManager key={section} collection={section}/>;if(section==='profile'||section==='seo'||section==='social'||section==='settings')return <SettingsEditor key={section} section={section}/>;if(section==='media')return <><PageHeading title="Media" description="Portfolio images, without destructive automatic cleanup."/><MediaLibrary/></>;notFound();}

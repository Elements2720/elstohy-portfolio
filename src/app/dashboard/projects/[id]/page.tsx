import {ProjectEditor} from '@/components/dashboard/projects';
export default async function EditorPage({params}:{params:Promise<{id:string}>}){const {id}=await params;return <ProjectEditor id={id}/>;}

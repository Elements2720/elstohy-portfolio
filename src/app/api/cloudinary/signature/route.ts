import {requireAdmin,AuthError} from '@/lib/auth/server';
import {signUpload} from '@/lib/cloudinary/sign';
export async function POST(request:Request){
 try{
  const origin=request.headers.get('origin');
  if(origin&&origin!==new URL(request.url).origin)throw new AuthError(403,'Cross-origin upload requests are not allowed.');
  const {uid}=await requireAdmin(request);
  const cloudName=process.env.CLOUDINARY_CLOUD_NAME,apiKey=process.env.CLOUDINARY_API_KEY,secret=process.env.CLOUDINARY_API_SECRET;
  if(!cloudName||!apiKey||!secret)throw new AuthError(503,'Image uploads are not configured.');
  const parameters={timestamp:Math.floor(Date.now()/1000),folder:`portfolio/${uid}`,public_id:crypto.randomUUID(),allowed_formats:'jpg,jpeg,png,webp,avif',overwrite:'false',transformation:'fl_strip_profile'};
  return Response.json({cloudName,apiKey,parameters,signature:await signUpload(parameters,secret)},{headers:{'Cache-Control':'no-store'}});
 }catch(error){const known=error instanceof AuthError;return Response.json({error:known?error.message:'Could not authorize upload.'},{status:known?error.status:500,headers:{'Cache-Control':'no-store'}});}
}

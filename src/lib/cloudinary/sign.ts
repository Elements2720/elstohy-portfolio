export async function signUpload(parameters:Record<string,string|number>,secret:string){
 const sorted=Object.entries(parameters).sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>`${k}=${v}`).join('&');
 const bytes=new TextEncoder().encode(sorted+secret);
 const digest=await crypto.subtle.digest('SHA-256',bytes);
 return Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
}

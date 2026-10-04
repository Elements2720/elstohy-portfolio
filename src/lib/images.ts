import type {Media} from './model';
export function responsiveMedia(image:Media,sizes:string){
 if(!image.secure_url.startsWith('https://res.cloudinary.com/'))return {src:image.secure_url};
 const resized=(width:number)=>image.secure_url.replace('/upload/',`/upload/f_auto,q_auto,w_${width}/`);
 return {src:resized(960),srcSet:[320,640,960,1440,1920].map(width=>`${resized(width)} ${width}w`).join(', '),sizes};
}

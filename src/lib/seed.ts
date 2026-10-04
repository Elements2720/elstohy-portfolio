import {newProject,newEntry,type Portfolio,type Media,type Project} from './model';
import {projectDetails} from './project-details';
import mediaManifest from '../../public/media/manifest.json';
import {mediaSchema} from './validation';
const images=new Map(mediaManifest.map(image=>[image.public_id,mediaSchema.parse(image)]));
function media(slug:string,index=1):Media{const image=images.get(`local/${slug}-${index}`);if(!image)throw new Error(`Missing project asset: ${slug}-${index}. Run npm run assets.`);return image;}
const definitions=[
 ['modo','Modo','Multi-vendor e-commerce & delivery platform','Commerce','2025',5],
 ['mock-meet','Mock Meet','Two-sided consulting and sessions app','Consulting','2025',5],
 ['motaah','Motaah','Two-sided recruitment & freelance marketplace','Marketplace','2024',5],
 ['tazweed','Tazweed','Multi-role B2B commerce platform','Commerce','2025',5],
 ['malahi-time','Malahi Time','Event and ticketing platform with live validation','Events','2025',5],
 ['eahs-uae','EAHS UAE','Equestrian business e-services','Mobile product','2024',5],
 ['eda-inspection','EDA Inspection','Regulatory field-inspection application','Field operations','2024',1],
 ['al-sundos','Al Sundos','Production Flutter app for iOS and Android','Mobile product','2025',5],
] as const;
const projects=definitions.map(([slug,title,description,category,year,count],i)=>{
 const p:Project={...newProject(slug),title,slug,shortDescription:description,fullDescription:description,category,startDate:year,role:'Flutter Developer',technologies:['Flutter','Dart'],platforms:slug==='eda-inspection'?['Android']:['iOS','Android'],featured:true,status:'published',displayOrder:i,coverImage:media(slug),screenshots:Array.from({length:count},(_,n)=>media(slug,n+1))};
 if(slug==='eda-inspection'){p.logo=media(slug);p.screenshots=[];}
 return {...p,...projectDetails[slug]};
});
const entries=(rows:string[][])=>rows.map(([title,description],i)=>({...newEntry(String(i)),title,description,shortDescription:description,summary:description,displayOrder:i,published:true}));
export const seed:Portfolio={
 profile:{displayName:'Mohammed El-Stohy',heroWord:'MOHAMMED',headline:'Senior Mobile Developer',secondaryHeadline:'Flutter + Dart',shortBio:'I build mobile products that ship — and stay maintainable.',about:'I have delivered production applications across healthcare, field operations, e-commerce, maps and navigation, and education. My work spans end-to-end feature delivery, maintainable architecture, native integrations and mentoring developers.',email:'mohamedelstohy147@gmail.com',availabilityText:'Available worldwide',portrait:null,heroImage:media('modo'),resumeUrl:'',resumeSanitized:false},
 projects,
 services:entries([['Mobile App Development','End-to-end Flutter applications for iOS and Android, from requirements to store release.'],['MVP & Product Delivery','Core product flows, clean architecture and a first release on both stores.'],['Project Takeover & Rescue','Adopt, stabilize and complete existing Flutter codebases.'],['Third-Party Integrations','Maps, real-time chat, video, authentication, push notifications and native SDKs.'],['Architecture & Code Quality','Modular codebases, predictable state and maintainability for products built to evolve.'],['Store Release & Maintenance','Build signing, TestFlight, Play Console and ongoing feature development.']]),
 experience:[{...newEntry('senior'),title:'Senior Flutter Developer',startDate:'2025-01',endDate:'',summary:'Architecture ownership across multiple mobile projects, modular codebases, production delivery and developer mentoring.',published:true},{...newEntry('flutter'),title:'Flutter Developer',startDate:'2023-12',endDate:'2024-12',summary:'Built and shipped iOS and Android applications, integrated real-time features and collaborated with product and quality teams.',published:true,displayOrder:1},{...newEntry('mobile'),title:'Flutter Developer',startDate:'2021-12',endDate:'2022-09',summary:'Developed mobile applications and dashboards with Flutter, Dart and Clean Architecture, including social login, live chat and live streaming.',published:true,displayOrder:2}],
 expertise:entries([['Flutter / Dart','Cross-platform product development.'],['Mobile Architecture','Clean Architecture and modular codebases.'],['State Management','Bloc, Cubit and predictable application state.'],['Firebase','Authentication, messaging and real-time data.'],['Realtime Systems','Chat, tracking and video integrations.'],['Native Integrations','Swift and Kotlin platform channels.'],['Quality & Delivery','Code review, CI/CD and app-store delivery.']]),
 settings:{sitePublished:true,defaultProjectSort:'displayOrder',contactEmail:'mohamedelstohy147@gmail.com',resumeEnabled:false},
 seo:{siteTitle:'Mohammed El-Stohy — Senior Mobile Developer',defaultDescription:'Selected mobile products, Flutter engineering, architecture and end-to-end app delivery by Mohammed El-Stohy.',defaultOgImage:null,canonicalBaseUrl:'',socialPreviewTitle:'Mohammed El-Stohy — Mobile engineering'},
 social:{email:'mohamedelstohy147@gmail.com',linkedin:'https://www.linkedin.com/in/mohammed-el-stohy-3b11712a0',github:'',other:[]},
};

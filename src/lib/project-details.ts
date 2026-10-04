import type {Project,ProjectApp} from './model';
import {emptyCaseStudy} from './model';
function connectedApp(app:Pick<ProjectApp,'name'|'type'|'iosUrl'|'androidUrl'>):ProjectApp{
 return {...app,id:app.name.toLowerCase(),platforms:app.iosUrl?['iOS','Android']:['Android'],logo:null,screenshots:[],websiteUrl:''};
}
export const projectDetails:Record<string,Partial<Project>>={
 modo:{
  projectType:'case-study',technologies:['Flutter','Dart','Clean Architecture','Bloc','Google Maps SDK','REST APIs'],
  fullDescription:'A multi-vendor marketplace with three coordinated applications: a customer storefront, a provider console and a delivery driver app, delivered from a shared Flutter codebase using flavors.',
  contributions:['Built shared components across three role-based apps.','Implemented product browsing, cart, checkout and order-lifecycle management.','Integrated real-time order and delivery tracking with Google Maps.','Developed provider-side store, catalog and order-management tools.'],
  caseStudy:{...emptyCaseStudy,architecture:'Clean Architecture and a multi-flavor, multi-module structure share networking, authentication, design-system and domain layers while isolating role-specific features. Bloc drives predictable state across commerce flows.'},
  apps:[connectedApp({name:'User',type:'Customer storefront',iosUrl:'https://apps.apple.com/app/id6742700878',androidUrl:'https://play.google.com/store/apps/details?id=com.moltaqa.modo.user'}),connectedApp({name:'Provider',type:'Store and catalog console',iosUrl:'https://apps.apple.com/app/id6742562886',androidUrl:'https://play.google.com/store/apps/details?id=com.moltaqa.modo.provider'}),connectedApp({name:'Delivery',type:'Driver and fulfilment',iosUrl:'https://apps.apple.com/app/id6752898958',androidUrl:'https://play.google.com/store/apps/details?id=com.moltaqa.modo.delivery'})],
 },
 motaah:{
  projectType:'case-study',technologies:['Flutter','Dart','Bloc / Cubit','Pusher Channels','Zoom Video SDK','Firebase FCM','REST APIs'],
  fullDescription:'A two-sided recruitment marketplace taking hiring from discovery through real-time conversation and live video interviews inside the app.',
  contributions:['Implemented predictable Bloc/Cubit state across multi-step flows.','Built synchronized real-time chat with Pusher Channels.','Integrated Zoom video rooms, runtime permissions and the call lifecycle.','Integrated REST APIs and transactional notifications with Firebase Cloud Messaging.'],
  caseStudy:{...emptyCaseStudy,technicalChallenges:'Real-time messaging required reliable synchronization across two role-based applications. In-app interviews required correct camera and microphone permissions and robust join, leave and end-call handling.'},
  apps:[connectedApp({name:'Candidate',type:'Job seekers',iosUrl:'https://apps.apple.com/app/id6457364509',androidUrl:'https://play.google.com/store/apps/details?id=com.moltaqa.motaah'}),connectedApp({name:'Recruiter',type:'Recruitment and hiring',iosUrl:'https://apps.apple.com/app/id6479753989',androidUrl:'https://play.google.com/store/apps/details?id=com.moltaqa.motahProvider'})],
 },
 tazweed:{
  projectType:'case-study',technologies:['Flutter','Dart','Clean Architecture','REST APIs','Multi-flavor'],
  fullDescription:'A business-to-business commerce platform with dedicated Trader and Merchant apps built from a shared Flutter core.',
  contributions:['Built role-based apps with shared reusable modules.','Implemented product discovery, ordering and order-lifecycle handling with validation and error handling.','Developed merchant catalog, inventory, order-processing and status-management capabilities.'],
  caseStudy:{...emptyCaseStudy,architecture:'Shared reusable modules support both roles while keeping role-specific surfaces isolated, with Clean Architecture and maintainable code across the platform.'},
  apps:[connectedApp({name:'Trader',type:'Buyer ordering',iosUrl:'https://apps.apple.com/app/id6752691491',androidUrl:'https://play.google.com/store/apps/details?id=com.moltaqa.tazweed.user'}),connectedApp({name:'Merchant',type:'Catalog and fulfilment',iosUrl:'https://apps.apple.com/app/id6752708668',androidUrl:'https://play.google.com/store/apps/details?id=com.moltaqa.tazweed.provider'})],
 },
 'malahi-time':{
  technologies:['Flutter','Dart','QR / Barcode scanning','Clean Architecture','State management'],
  fullDescription:'An event-access product with a customer ticketing app and a scanner application that validates tickets in real time at the gate.',
  contributions:['Implemented secure authentication, state management and shared core modules.','Built and optimized QR/barcode scanning with real-time ticket validation.','Focused on scalability, performance and code reusability.'],
  apps:[connectedApp({name:'User',type:'Tickets and events',iosUrl:'https://apps.apple.com/app/id6746491069',androidUrl:'https://play.google.com/store/apps/details?id=com.moltaqa.malahi.user'}),connectedApp({name:'Scanner',type:'Gate validation',iosUrl:'',androidUrl:'https://play.google.com/store/apps/details?id=com.moltaqa.malahi_scanner'})],
 },
 'mock-meet':{
  fullDescription:'A two-sided product connecting users with consultants, released as separate User and Consultant applications on both stores.',
  contributions:['Shipped role-based User and Consultant apps for iOS and Android from a shared Flutter codebase.'],
  apps:[connectedApp({name:'User',type:'Book sessions',iosUrl:'https://apps.apple.com/app/id6755878462',androidUrl:'https://play.google.com/store/apps/details?id=com.asool.mockmeet.user'}),connectedApp({name:'Consultant',type:'Run sessions',iosUrl:'https://apps.apple.com/app/id6755878425',androidUrl:'https://play.google.com/store/apps/details?id=com.asool.mockmeet.provider'})],
 },
 'eahs-uae':{
  projectType:'case-study',technologies:['Flutter','Dart','UAE PASS SDK','Firebase Realtime Database','Clean Architecture','Bloc'],
  fullDescription:'The mobile product combines a horse registry, pedigree and lineage navigation, and digitally signed request workflows.',
  contributions:['Implemented horse profiles and family-tree navigation for lineage tracing.','Integrated secure authentication and e-signature flows with UAE PASS.','Implemented real-time data synchronization with Firebase Realtime Database.'],
  caseStudy:{...emptyCaseStudy,technicalChallenges:'Pedigree navigation required a responsive family-tree model as lineage depth grows. Official requests required secure authentication and e-signature integration.'},
  androidUrl:'https://play.google.com/store/apps/details?id=com.eahs.main',iosUrl:'https://apps.apple.com/app/id6668329930',
 },
 'al-sundos':{technologies:['Flutter','Dart','Clean Architecture'],fullDescription:'A production Flutter application delivered for iOS and Android and released on both stores.',contributions:['Delivered and released a production Flutter app across Google Play and the App Store.'],iosUrl:'https://apps.apple.com/app/id6766856535',androidUrl:'https://play.google.com/store/apps/details?id=com.moltaqa.alsondos'},
 'eda-inspection':{
  projectType:'case-study',technologies:['Flutter','Dart','Hive','Offline-first','Offline outbox','REST APIs'],
  fullDescription:'A field-inspection application for standardized on-site audits, including assignments, checklists, findings, violations and submission without continuous connectivity.',
  contributions:['Digitized the end-to-end inspection workflow.','Persisted inspection drafts, evidence metadata and form state locally with Hive.','Implemented secure evidence-attachment handling.','Built an offline outbox with retry and synchronization when connectivity returns.'],
  caseStudy:{...emptyCaseStudy,technicalChallenges:'Low-connectivity field visits required offline-first capture. Completed inspections are queued in an outbox and retried when the network returns, protecting work from data loss.'},
 },
};

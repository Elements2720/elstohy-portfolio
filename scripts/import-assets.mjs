import {mkdir,writeFile} from 'node:fs/promises';
const root='https://elstohy-portfolio.pages.dev';
const shots={
 modo:['shot-1.0MrSW1Y8_ZAsPCf.webp','shot-2.C879-iU3_ZkjHMH.webp','shot-3.CvWfZMhQ_Z11wpn3.webp','shot-4.lvEPFuW1_22sTEB.webp','shot-5.BZSajvOs_ZphNp7.webp'],
 motaah:['shot-1.BFUWZIJD_Z20kKmm.webp','shot-2.ezSYSKBl_Z12i9c7.webp','shot-3.Bg4n9nc6_15Nd8C.webp','shot-4.BGsI6zd-_NVWs6.webp','shot-5.CAhOLPtZ_1qEcTu.webp'],
 'eahs-uae':['shot-1.CIPhaRFH_ZrMycF.webp','shot-2.BD9gYuU1_Z2oCGaY.webp','shot-3.Dqj8Y8Cu_uBsWg.webp','shot-4.WWco_J6t_Z1n9QXL.webp','shot-5.DVYO4hY0_2rWllb.webp'],
 tazweed:['shot-1.BZI4v15z_Z1rCqzd.webp','shot-2.Pz198AFV_1Hx1CN.webp','shot-3.BmkxuZOI_Z1Brsr2.webp','shot-4.By0pnnE2_Z25YJxR.webp','shot-5.CmEe6QwN_1QBmux.webp'],
 'malahi-time':['shot-1.Comoi1we_ZStzNm.webp','shot-2.DSvuoeGv_ZnzaG1.webp','shot-3.BCT7j8DC_1RjMX0.webp','shot-4.DIWpKdwE_ZewQsl.webp','shot-5.B2uQ59_g_1NxQBP.webp'],
 'mock-meet':['shot-1.BkoofzaH_jzuq9.webp','shot-2.Dl8I0q4q_1JMlTn.webp','shot-3.DVCx9GaF_ZHswjb.webp','shot-4.VlrwuWY1_ZonHYV.webp','shot-5.BFu8a6Az_uvB0E.webp'],
 'eda-inspection':['logo.D_twKyoR_XNmDW.webp'],
 'al-sundos':['shot-1.5ejCV6N0_Z1zMlyB.webp','shot-2.jhH5C6xT_5fspR.webp','shot-3.WTHSPUgc_7Y0JY.webp','shot-4.Cjzg6j-2_2crNzU.webp','shot-5.BEgf2iK1_22ot3k.webp'],
};
function dimensions(bytes){
 const type=bytes.toString('ascii',12,16);
 if(type==='VP8X')return {width:1+bytes.readUIntLE(24,3),height:1+bytes.readUIntLE(27,3)};
 if(type==='VP8 ')return {width:bytes.readUInt16LE(26)&0x3fff,height:bytes.readUInt16LE(28)&0x3fff};
 if(type==='VP8L'){const bits=bytes.readUInt32LE(21);return {width:(bits&0x3fff)+1,height:((bits>>>14)&0x3fff)+1};}
 throw new Error('Unsupported project image format.');
}
await mkdir('public/media',{recursive:true});await mkdir('public/fonts',{recursive:true});
const provenance=[],manifest=[];
for(const [slug,files] of Object.entries(shots))for(const [i,file] of files.entries()){
 const url=`${root}/_astro/${file}`,res=await fetch(url);if(!res.ok)throw new Error(`Asset failed: ${url}`);
 const path=`public/media/${slug}-${i+1}.webp`,bytes=Buffer.from(await res.arrayBuffer());await writeFile(path,bytes);provenance.push({path,source:url,purpose:'Real project artwork copied read-only from previous published portfolio'});manifest.push({public_id:`local/${slug}-${i+1}`,secure_url:`/media/${slug}-${i+1}.webp`,...dimensions(bytes),format:'webp',resource_type:'image'});
}
const html=await (await fetch('https://porto-template.framer.website/')).text();
const blocks=[...html.matchAll(/@font-face\s*\{([^}]+)\}/g)].map(m=>m[1]);
const fontCss=await (await fetch('https://api.fontshare.com/v2/css?f[]=clash-display@600,500&display=swap')).text();
for(const [weight,path] of [[600,'public/fonts/clash-display.woff2'],[500,'public/fonts/clash-display-medium.woff2']]){
 const block=[...fontCss.matchAll(/@font-face\s*\{([^}]+)\}/g)].find(m=>m[1].includes(`font-weight: ${weight}`))?.[1];const rawUrl=block?.match(/url\(['"]([^'"]+\.woff2)['"]\)/)?.[1];if(!rawUrl)throw new Error('Fontshare font not available.');const fontUrl=rawUrl.startsWith('//')?`https:${rawUrl}`:rawUrl;const response=await fetch(fontUrl);await writeFile(path,Buffer.from(await response.arrayBuffer()));provenance.push({path,source:fontUrl,purpose:'Clash Display obtained directly from Fontshare for this portfolio under its freeware license'});
}
const textFont=blocks.find(s=>s.includes('Inter Display')&&/font-weight:\s*500/.test(s)&&(/U\+0000-00FF/i.test(s)||/U\+0-FF/i.test(s)))||blocks.find(s=>s.includes('Inter Display')&&/font-weight:\s*500/.test(s));
const textFontUrl=textFont?.match(/url\(["']?([^"')]+)["']?\)/)?.[1];
if(textFontUrl){const r=await fetch(textFontUrl);await writeFile('public/fonts/inter-display-medium.woff2',Buffer.from(await r.arrayBuffer()));provenance.push({path:'public/fonts/inter-display-medium.woff2',source:textFontUrl,purpose:'Reference Inter Display medium text font, SIL Open Font License'});}
await writeFile('audit/ASSET-PROVENANCE.json',JSON.stringify(provenance,null,2));console.log(`${provenance.length} verified assets imported; no resume copied.`);
await writeFile('public/media/manifest.json',JSON.stringify(manifest,null,2));

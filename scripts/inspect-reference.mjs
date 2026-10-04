import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
const browser = await chromium.launch({headless:true});
await mkdir('audit/reference', {recursive:true});
const page = await browser.newPage();
const widths=[1728,1440,1280,1024,768,430,390,375];
const audit=[];
for(const width of widths){
 await page.setViewportSize({width,height:1000});
 await page.goto('https://porto-template.framer.website/',{waitUntil:'networkidle'});
 await page.waitForTimeout(2500);
 await page.screenshot({path:`audit/reference/home-${width}.png`});
 audit.push(await page.evaluate((width)=>({width,height:document.documentElement.scrollHeight,background:getComputedStyle(document.body).backgroundColor,fonts:[...document.fonts].map(f=>({family:f.family,weight:f.weight})),text:[...document.querySelectorAll('h1,h2,h3,h4,h5,h6,p')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.height}).map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return{text:e.textContent,x:r.x,y:r.y,w:r.width,h:r.height,font:s.fontFamily,size:s.fontSize,line:s.lineHeight,weight:s.fontWeight,tracking:s.letterSpacing}})}),width));
 if(width===1440){
  for(let y=0;y<12000;y+=600){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(350);}
  await page.screenshot({path:'audit/reference/home-1440-full.png',fullPage:true});
  await page.evaluate(()=>scrollTo(0,0)); await page.mouse.move(800,400);await page.waitForTimeout(500);
 }
}
await page.setViewportSize({width:1440,height:1000});
await page.goto('https://porto-template.framer.website/work/seventy-seven',{waitUntil:'networkidle'});
await page.waitForTimeout(1800);
await page.screenshot({path:'audit/reference/work-1440.png',fullPage:true});
audit.push(await page.evaluate(()=>({projectText:document.body.innerText,images:[...document.images].map(i=>({src:i.src,w:i.naturalWidth,h:i.naturalHeight})),fonts:[...document.querySelectorAll('h1,h2,h3,p')].map(e=>({text:e.textContent,size:getComputedStyle(e).fontSize,family:getComputedStyle(e).fontFamily}))})));
await writeFile('audit/reference/measurements.json',JSON.stringify(audit,null,2));
console.log('Reference screenshots and measurements captured at all eight widths.');
await browser.close();

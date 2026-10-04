import {chromium} from 'playwright';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch(),p=await browser.newPage({viewport:{width:1440,height:1000}});
await p.goto('https://porto-template.framer.website/',{waitUntil:'networkidle'});const height=await p.evaluate(()=>document.documentElement.scrollHeight);
for(let y=0;y<height;y+=500){await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await p.waitForTimeout(120);}
await p.screenshot({path:'audit/reference/complete-home.png',fullPage:true});
const project=p.locator('a[href="./work/seventy-seven"]').first();await project.scrollIntoViewIfNeeded();await project.hover();await p.waitForTimeout(800);await p.screenshot({path:'audit/reference/project-hover.png'});
const interactions=await p.evaluate(()=>({cursor:getComputedStyle(document.body).cursor,fixedElements:[...document.querySelectorAll('*')].filter(e=>getComputedStyle(e).position==='fixed').map(e=>({name:e.getAttribute('data-framer-name'),text:e.textContent?.slice(0,80),cursor:getComputedStyle(e).cursor}))}));
await p.setViewportSize({width:390,height:1000});await p.goto('https://porto-template.framer.website/work/seventy-seven',{waitUntil:'networkidle'});await p.waitForTimeout(1500);await p.screenshot({path:'audit/reference/work-390.png'});
await writeFile('audit/reference/interactions.json',JSON.stringify(interactions,null,2));console.log(interactions);await browser.close();

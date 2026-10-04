import {chromium} from 'playwright';
import {writeFile} from 'node:fs/promises';
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1440,height:1000}});
await p.goto('https://porto-template.framer.website/',{waitUntil:'networkidle'});await p.waitForTimeout(1800);
console.log(await p.evaluate(()=>({fonts:[...document.querySelectorAll('style')].flatMap(s=>[...s.textContent.matchAll(/url\(([^)]+\.woff2[^)]*)\)/g)].map(m=>m[1])).slice(0,30),headings:[...document.querySelectorAll('h1,h2,h3,h4')].map(e=>({t:e.textContent,size:getComputedStyle(e).fontSize,line:getComputedStyle(e).lineHeight,rect:{y:e.getBoundingClientRect().y,h:e.getBoundingClientRect().height}})),sticky:[...document.querySelectorAll('*')].filter(e=>getComputedStyle(e).position==='sticky').map(e=>({name:e.getAttribute('data-framer-name'),top:getComputedStyle(e).top}))})));
for(const [name,y] of [['approach',1500],['work',2550],['profile',5500],['services',6700],['experience',10700],['contact',20700]]){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(900);await p.screenshot({path:`audit/reference/${name}.png`});}
const urls=await p.evaluate(()=>[...document.fonts].map(f=>f.family));
await writeFile('audit/reference/font-families.json',JSON.stringify([...new Set(urls)]));
await b.close();

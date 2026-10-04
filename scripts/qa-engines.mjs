import {chromium,firefox,webkit} from 'playwright';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const report=[];
for(const [name,engine] of Object.entries({chromium,firefox,webkit})){
 let browser;
 try{browser=await engine.launch(name==='webkit'&&process.env.PLAYWRIGHT_WEBKIT_EXECUTABLE?{executablePath:process.env.PLAYWRIGHT_WEBKIT_EXECUTABLE}:{});const errors=[];
  for(const width of [1440,390]){const context=await browser.newContext({viewport:{width,height:1000},timezoneId:'Asia/Tokyo',reducedMotion:'reduce'}),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto('http://localhost:3000/',{waitUntil:'networkidle'});await page.waitForTimeout(200);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width);const expected=await page.evaluate(()=>new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(new Date()));assert.equal((await page.locator('.local-clock time').textContent()).slice(0,5),expected.slice(0,5));await page.getByRole('button',{name:'Open navigation'}).click();await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:/WORK/i}).click();await page.goto('http://localhost:3000/work/mock-meet',{waitUntil:'networkidle'});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width);assert.equal(await page.locator('.more-work .work-item').count(),2);await page.goto('http://localhost:3000/dashboard/login',{waitUntil:'networkidle'});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width);await context.close();}
  assert.deepEqual(errors,[]);report.push({engine:name,result:'passed',widths:[1440,390],checks:['public pages','project detail','navigation','local clock in Tokyo browser timezone','reduced motion','dashboard login'],errors});
 }catch(error){report.push({engine:name,result:'blocked-or-failed',reason:error.message});}finally{await browser?.close();}
}
await writeFile('audit/build/engine-results.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
assert.equal(report.every(engine=>engine.result==='passed'),true,'A browser-engine check failed or was blocked.');console.log('BROWSER_ENGINES_VERIFIED');

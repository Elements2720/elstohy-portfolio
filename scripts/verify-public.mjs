import {chromium} from 'playwright';
import {readFile,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const prohibited=/\b(?:Egypt|Cairo|Mansoura|Mahalla|Moltaqa|Asool|Captivate|Spectrum for Information Systems|IX Solutions|WhatsApp)\b|\+\d[\d ()-]{8,}/i;
assert.equal(prohibited.test('Based in Cairo; COMPANY Moltaqa; +201234567890'),true);
const browser=await chromium.launch(),page=await browser.newPage();const sdkResponses=[];
page.on('response',response=>{if(response.url().endsWith('.js'))sdkResponses.push(response.text().catch(()=>''));});
const results=[];
for(const path of ['/','/work/modo','/work/motaah','/work/tazweed','/work/malahi-time','/work/mock-meet','/work/eahs-uae','/work/al-sundos','/work/eda-inspection']){
 const response=await page.goto(`http://localhost:3000${path}`,{waitUntil:'networkidle'});assert.equal(response.status(),200);
 const visible=await page.locator('body').innerText();assert.equal(prohibited.test(visible),false,`Prohibited visible content on ${path}`);
 const metadata=await page.evaluate(()=>[...document.querySelectorAll('head meta')].map(meta=>meta.content).join(' '));assert.equal(prohibited.test(metadata),false,`Prohibited metadata on ${path}`);
 const jsonLd=await page.locator('script[type="application/ld+json"]').allTextContents();for(const encoded of jsonLd){const person=JSON.parse(encoded);for(const key of ['address','addressCountry','telephone','geo','worksFor','affiliation'])assert.equal(key in person,false);}
 assert.equal(await page.locator('a[href^="tel:"],a[href*="wa.me"],a[href*="whatsapp"]').count(),0);
 results.push({path,status:response.status(),privacy:'passed'});
}
const scripts=await Promise.all(sdkResponses);assert.equal(scripts.some(source=>source.includes('identitytoolkit.googleapis.com')),false,'Firebase Auth code reached public visitors.');
for(const path of ['/register','/sign-up','/create-account','/work/not-a-published-project'])assert.equal((await fetch(`http://localhost:3000${path}`)).status,404);
const html=await (await fetch('http://localhost:3000/')).text();assert.match(html,/--:--:--/);
const packageJson=JSON.parse(await readFile('package.json','utf8'));assert.equal(Object.keys(packageJson.dependencies).some(name=>name.includes('astro')),false);
assert.equal(/output\s*:\s*['"]export['"]/.test(await readFile('next.config.ts','utf8')),false);
await writeFile('audit/build/privacy-results.json',JSON.stringify({results,publicAuthSdk:'not loaded',registrationRoutes:'404',unknownWork:'404',serverClock:'placeholder',astro:'absent',staticExport:'absent',positiveControl:'prohibited fixture detected'},null,2));
await browser.close();console.log('PUBLIC_PRIVACY_AND_RENDERING_VERIFIED');

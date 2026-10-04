# Mohammed El-Stohy — portfolio + owner studio

A separate Next.js project with a Porto-reconstructed public portfolio and a Firebase-authorized owner dashboard. The previous portfolio was only fetched for factual content and project artwork; its local source and dependencies were not modified.

## Run locally

Requires Node.js 24 (used for verification) and npm. Java 21 is required only for Firestore emulator tests.

```sh
npm ci
npm run assets
npm run dev
```

Open `http://localhost:3000`. The unconfigured public site renders verified starter content. `/dashboard/login` explains the missing Firebase configuration rather than providing a fake login. `npm run assets` downloads the real project artwork and display fonts; network access is required. Clash Display files are gitignored because Fontshare requires each user to obtain their own copy. The script obtains those files directly from Fontshare for this project. Inter’s license is included in `public/fonts/OFL.txt`.

For the production Next.js server:

```sh
npm run build
npm run start
```

Next.js outputs to `.next-nextjs`; vinext uses `.next` for generated route types. The separate paths prevent the two tools from overwriting each other’s route validators.

## Stack and deployment path

- Next.js 16, React 19, TypeScript, Tailwind CSS 4
- Motion for React; no GSAP
- Firebase Authentication: email/password; Cloud Firestore
- Cloudinary signed direct image uploads
- Cloudflare Workers via vinext 1.0.1, Vite 8 and the Cloudflare Vite plugin

The Workers setup follows [Cloudflare’s current Next.js guidance](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/). The vinext/Cloudflare toolchain is beta; the tested Cloudflare plugin and CLI versions are pinned. No static-export configuration is used. Public routes are server-rendered; critical content and metadata do not depend on client Firebase fetching.

## Configure a new Firebase project

Use a **new Firebase project for this portfolio**, independent of the previous portfolio’s infrastructure.

1. Register a web app and create a Firestore database.
2. Enable Firebase Authentication → Email/Password.
3. Manually create the owner account in the Authentication console. There is no registration page.
4. Copy `.env.example` to `.env.local` and fill in the variables below.
5. Add `localhost` and the production hostname to Firebase Authentication’s authorized domains.
6. Deploy the rules and indexes:

```sh
npx firebase login
npx firebase deploy --only firestore:rules,firestore:indexes --project YOUR_NEW_PROJECT_ID
```

7. In the Firestore console, manually create `admins/OWNER_UID` with:

```json
{ "enabled": true }
```

The UID must be the owner account’s actual Firebase UID. Client code cannot create, modify or list admin documents. Authenticated users can only get their own admin document; it is not publicly readable.

8. Sign in at `/dashboard/login`. On Overview, **Import verified starter content** is available when there are no projects. It imports the curated products and editorial content; existing profile/settings records are preserved. You can instead start with an empty project and save only a title as Draft.

When Firebase is configured, failed database reads surface as an error; the site does not silently replace an outage with the local starter projects. Published content is queried with security-rule-compatible filters.

## Environment variables

| Variable | Use | Browser exposure |
| --- | --- | --- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase web app API key | Public, intentional |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain | Public, intentional |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase web project ID | Public, intentional |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase web app ID | Public, intentional |
| `FIREBASE_PROJECT_ID` | Server token audience and Firestore project; match the browser project | Server binding |
| `FIREBASE_WEB_API_KEY` | Server account lookup and public Firestore requests; same Firebase web API key | Server binding; not a private service-account credential |
| `CLOUDINARY_CLOUD_NAME` | Upload destination | Returned to authorized uploader |
| `CLOUDINARY_API_KEY` | Cloudinary public upload API key | Returned to authorized uploader |
| `CLOUDINARY_API_SECRET` | SHA-256 upload signature generation | **Server-only secret** |
| `SITE_URL` | Absolute canonical production origin, e.g. `https://portfolio.example.com` | Rendered in public metadata |
| `NEXT_PUBLIC_AUTH_EMULATOR_URL` | Optional development-only Auth emulator, e.g. `http://127.0.0.1:9099` | Development-only |
| `NEXT_PUBLIC_FIRESTORE_EMULATOR_HOST` | Optional development-only Firestore emulator hostname, e.g. `127.0.0.1`; port is 8080 | Development-only |

No Firebase service-account/private-key credential is needed: the signing route verifies Google’s public signing keys and uses the verified Firebase ID token for its rule-enforced admin lookup. Emulator variables are ignored by production builds.

Never prefix Cloudinary’s secret with `NEXT_PUBLIC_`. `.env.local`, other real environment files and `.dev.vars` are gitignored. Public Firebase variables must be supplied **before building**, because they are embedded in browser bundles. Cloudinary’s secret remains a runtime server binding.

## Workers build and deployment

```sh
npm run build:workers
npm run preview:workers
```

`cloudflare.config.ts` declares the application Worker, static assets and six server bindings. It does not provision KV, R2, paid image optimization, databases or other paid Cloudflare services. Cloudinary and Firebase remain subject to their account quotas; this project does not enable paid plans.

After authenticating the Cloudflare CLI for your own account, deploy the already-built output:

```sh
npm run deploy
```

Set these runtime bindings in Cloudflare’s Worker Settings → Variables and Secrets: `FIREBASE_PROJECT_ID`, `FIREBASE_WEB_API_KEY`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `SITE_URL`. They are declared as secret bindings to keep configuration out of committed files; only Cloudinary’s API secret is intrinsically private. For local Workers preview, put their values in the gitignored `.dev.vars` file. Publish Firestore rules before enabling the live dashboard.

The build produces `.cloudflare/output/`. A successful local build/preview is not evidence of a live deployment. No production deployment or live credentials have been supplied in this session.

## Dashboard workflows

Navigation: Overview, Profile, Projects, Services, Experience, Expertise, Social Links, Media, SEO and Settings.

- Projects: create, edit, delete with confirmation, duplicate, Draft/Publish/Unpublish, feature/unfeature and reorder. IDs remain stable; slugs only change deliberately. Slug claims are transactional and protected by rules.
- Project tabs: Basic, Media, Project Apps, Technical Details, Case Study, Links and Publishing. Tabs support arrows, Home/End and keyboard focus. Editors warn before discarding unsaved changes.
- Connected apps live inside a project. Add/remove/reorder apps, logos, screenshots, platforms and verified store/website links.
- A chosen cover is the primary public artwork. Wide covers fill the media area; portrait covers can be composed with that project’s other screenshots.
- Empty case-study fields do not render. No missing technical facts or outcomes are generated automatically.
- Services, Experience and Expertise have editable entries, publishing and ordering controls. No employer/company field exists.
- Profile controls identity, hero word/artwork, bio, portrait and a manually reviewed résumé URL. Résumé download requires both `resumeSanitized` and `resumeEnabled`. The old PDF was not copied or published; there is no PDF upload bypass.
- Contact email changes are synchronized between Profile, Social Links and Settings in one Firestore transaction.
- Media supports preview, signed upload progress/errors, selecting existing images, replacing/removing references and screenshot ordering. Removing a reference never permanently deletes a Cloudinary asset.
- SEO supports global and project metadata plus selected OG imagery and automatic title/description fallbacks.

## Firestore model and authorization

| Path | Public access |
| --- | --- |
| `site/profile`, `site/seo` | Read when the site is published |
| `site/settings` | Read safe, allowlisted public settings |
| `projects/{id}` | Published records only |
| `services/{id}`, `experience/{id}`, `expertise/{id}` | `published == true` only |
| `socialLinks/main` | Read when the site is published |
| `admins/{uid}` | Authenticated user may get own document only; no listing/client writes |
| `slugs/{slug}` | Admin-only transactional slug registry |
| `media/{id}` | Admin-only media metadata |

Writes require an enabled admin document. Authentication without authorization is insufficient. Unconstrained public collection queries are denied; public queries must include their publication filter. Public reads are denied when `sitePublished` is false, except the safe settings document. Server reads pass through these same rules without privileged admin credentials.

## Signed upload flow

1. Dashboard obtains the owner’s Firebase ID token.
2. `POST /api/cloudinary/signature` receives it in `Authorization: Bearer …`.
3. Server verifies the Google-signed token’s issuer/audience/expiration, checks the Firebase account/session and independently reads `admins/{uid}` with the token.
4. An enabled admin receives a timestamp, owner-scoped folder, random public ID, permitted formats, incoming `fl_strip_profile` transformation and a SHA-256 signature. The secret is never returned.
5. Browser uploads the file directly to Cloudinary’s **image** upload endpoint with `XMLHttpRequest` progress events.
6. Dashboard stores `public_id`, `secure_url`, `width`, `height`, `format` and `resource_type`.

Missing or expired authentication returns 401; a non-admin or cross-origin request returns 403; missing service configuration returns 503. Image-selection UI restricts formats to JPG/PNG/WebP/AVIF and files to 10 MB. Permanent Cloudinary cleanup is intentionally separate from reference removal.

## Public privacy and SEO

No personal location, address, phone, WhatsApp or employer fields are rendered or added to metadata/JSON-LD. A privacy validation check rejects known prohibited copy, but the owner must still review any new text, uploaded artwork or résumé for unwanted information. App branding and legitimate store identifiers remain project assets, not employer labels.

The clock server-renders `--:--:--`, then uses the visitor browser’s `Intl.DateTimeFormat` every second without a timezone argument. Its interval is cleaned up on unmount. No geolocation or IP lookup is performed; the HTTP permissions policy also disables geolocation.

Public pages supply server-rendered titles/descriptions, canonical URLs, OpenGraph/Twitter metadata, publication-aware sitemap and robots directives. Truthful Person JSON-LD includes name, role, URL and approved social links, with no geographic/telephone/employer properties. Configure `SITE_URL` or the Dashboard canonical base URL before launch.

## Checks and evidence

```sh
npm run typecheck
npm test
npm run test:rules
```

`npm run test:rules` uses the isolated `demo-porto` Firestore emulator, never the production database. Browser scripts require Playwright browser binaries (`npx playwright install chromium firefox webkit`) and the corresponding OS libraries.

- `scripts/qa-browser.mjs`: public captures at all eight requested widths against a production server on port 3000.
- `scripts/qa-engines.mjs`: desktop/mobile browser-engine smoke checks, browser-local clock and reduced motion.
- `scripts/qa-dashboard.mjs`: owner/non-admin, draft/published server rendering and editor integration against development port 3002 and Auth/Firestore emulators. It clears **only the demo emulator database/accounts**. Upload responses in this script are mocked; real Cloudinary operation requires your account.
- `audit/reference/`: Porto browser captures/measurements.
- `audit/build/`, `audit/dashboard/`: implementation evidence and recorded results.
- `audit/DESIGN-AUDIT.md`: source measurements and motion contract.
- `audit/ASSET-PROVENANCE.json`: sources for shipped artwork/fonts.

The scripts assume servers already running. For dashboard integration, run Auth and Firestore emulators with `--project demo-porto --only auth,firestore`, then start development on port 3002 with the two emulator variables and a demo Firebase web configuration. Safari hardware/browser verification and real production-service checks are separate from Linux WebKit engine checks.

## Source structure

```text
src/app/                 Public/server pages, SEO routes, dashboard routes and signing API
src/components/public/   Editorial portfolio, header, visitor clock, artwork and motion
src/components/dashboard/Owner auth, navigation, grouped forms, CRUD and image editing
src/lib/                 Models, validation, content reads, SEO, auth and Firebase operations
public/media/            Verified local project artwork
public/fonts/            Self-hosted display/text fonts and Inter license
tests/                   Signing/validation contracts and real emulator rules tests
scripts/                 Asset import and browser QA
audit/                   Design and verification evidence, not public assets
```

Observed differences from Porto: longer identity requires different fitted lettering; mobile screenshots replace photography; typographic profile treatment replaces an unavailable portrait; sections without truthful equivalent (pricing, awards, testimonials) are omitted; exact Framer timing and page-transition behavior are not claimed as identical. The public and dashboard visual systems are separate.

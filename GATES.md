# Gates: portfolio rebuild verification

Scope: Separate Porto-reconstructed public portfolio, authorized single-owner dashboard, publishable content and signed uploads; production service activation is an explicit handoff.

- [x] G1: TypeScript source and generated routes have compatible types
  CHECK: npm run typecheck
  EXPECT: tsc --noEmit
  EVIDENCE: Final npm run typecheck exited 0; both production builds also completed generated-route type analysis.

- [x] G2: Next.js produces a production server build
  CHECK: npm run build
  EXPECT: Route (app)
  EVIDENCE: Final production build exited 0; / and /work/[slug] are dynamic server routes. Capture manifest verifies the running server BUILD_ID.

- [x] G3: Cloudflare produces the Workers application bundle
  CHECK: npm run build:workers
  EXPECT: Build complete.
  EVIDENCE: Final Workers build exited 0. Local preview returned 200 for home/work/login/sitemap/robots, 404 for unknown work, and 401 for unsigned signing.

- [x] G4: Signing authorization and publication validation reject unauthorized or incomplete operations
  CHECK: npm test
  EXPECT: fail 0
  EVIDENCE: Six tests passed, zero failed; tests/security.test.ts. External account/token responses are mocked at their HTTP boundary.

- [x] G5: Real Firestore rules deny unauthenticated/non-admin writes and draft reads
  CHECK: npx tsx --test tests/firestore.rules.test.ts
  EXPECT: fail 0
  EVIDENCE: Seven scenarios passed against real Firestore emulator on port 8080 after clearing only demo-porto data. npm run test:rules is the standalone emulator-launching equivalent.

- [x] G6: All requested public viewport widths avoid overflow, broken images and runtime errors
  CHECK: node scripts/qa-browser.mjs
  EXPECT: PUBLIC_VIEWPORT_QA_VERIFIED
  EVIDENCE: audit/build/browser-results.json and capture-manifest.json; 1728,1440,1280,1024,768,430,390,375px, no overflow/missing images/runtime errors.

- [x] G7: Owner workflows persist through real Auth/Firestore emulators and deny non-admin access
  CHECK: node scripts/qa-dashboard.mjs
  EXPECT: Dashboard integration checks passed.
  EVIDENCE: audit/dashboard/results.json; title-only draft, cover/apps, publish SSR, unpublish 404, keyboard/mobile tabs, synchronized contact, starter import preserving edits/media, deletion/logout/non-admin denial. Upload and labeled wide-image responses are mocked network fixtures.

- [x] G8: Published HTML/metadata omit prohibited personal information and public visitors do not load Firebase Auth
  CHECK: node scripts/verify-public.mjs
  EXPECT: PUBLIC_PRIVACY_AND_RENDERING_VERIFIED
  EVIDENCE: audit/build/privacy-results.json; all eight project pages and home checked; forbidden fixture positive control, JSON-LD fields, links, clock placeholder and public Auth bundle exclusion assertions pass.

- [x] G9: Chromium, Firefox and WebKit pass desktop/mobile and reduced-motion clock/navigation smoke checks
  CHECK: node scripts/qa-engines.mjs
  EXPECT: BROWSER_ENGINES_VERIFIED
  EVIDENCE: audit/build/engine-results.json; all three engines pass at 1440/390px, Tokyo browser-local clock and reduced motion without runtime errors. Linux WebKit is not real Safari hardware testing.

- [x] G10: Side-by-side visual review resolves the named material Porto fidelity issues
  EVIDENCE: Independent reviewer ses_efbce8f2dffequGh1yC6f9B43z scored the named fixes resolved, disposition ship at the fix-list scope. Active VIEW, landscape fixture and selected mobile Publishing captures close the partial items. This is not a pixel-identical or whole-surface approval claim.

- [x] G11: The old project remains untouched
  EVIDENCE: New directory was empty on inspection; implementation writes are confined to this new Git repository and temporary tooling. Old website access used read-only GET requests for factual content and assets; no old local source/dependency/Git commands were performed.

- [ ] G12: Production owner login, Cloudinary upload and live Workers deployment are verified with the owner's service accounts
  EVIDENCE: pending owner configuration; local/emulator tests are not production service evidence

G12 UPDATE: Real accounts configured and Worker deployed; see audit/DEPLOYMENT.md. Both requested administrators authorized, starter content imported, production domains configured. Live public pages and direct signed Cloudinary upload/retrieval/cleanup verified. Owner-password login and authenticated dashboard upload require the owner's final check; no owner session was impersonated. This gate remains partial.

Runtime prerequisites: Node 24; installed Playwright browsers and OS libraries; Java 21 for Firestore; production Next server on port 3000; demo Auth/Firestore emulators on 9099/8080 and a correctly configured development server on port 3002. WSL browser-library overrides used in this session are temporary tooling, not application configuration.

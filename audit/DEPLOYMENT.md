# Production deployment

Deployed to **https://elstohy-dev.shreefgamal2720.workers.dev**.

- Worker: `elstohy-dev`; deployed version `c66f0bba-5102-46ac-89e2-efcf3a61bffb`.
- Firebase: `proto-c6d60`, default Firestore database in Frankfurt (`europe-west3`). Rules and indexes deployed.
- Both user-supplied Firebase accounts were verified enabled and authorized with `admins/{uid}.enabled = true`, as explicitly requested. Both have full editing/publishing/deletion/upload privileges.
- Eight projects and 72 starter records imported atomically with create-only preconditions. Includes editorial/site content, media and slug claims.
- Email/password authentication is enabled; production hostname added to existing authorized domains.
- Six server bindings supplied at deploy time, including the server-only Cloudinary API secret and production SITE_URL. Temporary secrets file deleted after deployment. Real credentials remain in gitignored `.env.local` and Cloudflare configuration, not this report.

## Verified live

- Home, Modo work detail, login, sitemap and robots return 200; unknown work returns 404.
- Unsigned upload-signature request returns 401.
- Chromium at 1440/390px: home has no horizontal overflow or broken loaded images; work heading and configured login controls render; no page runtime errors.
- Cloudinary: real SHA-256-signed upload, image retrieval and deletion of the temporary verification asset all passed. This directly verifies upload credentials/service behavior; it does not substitute for authenticated dashboard signing.
- Evidence: `build/live-results.json`, `build/live-home-1440.png`, `build/live-home-390.png`.

## Owner check still required

Sign in at `/dashboard/login` with either account's email/password and upload an image through Media. No owner passwords were requested or used, and no owner session was impersonated. Password-based production login and the full authenticated dashboard-to-signing-endpoint upload remain owner verification steps.

This report supersedes the earlier report's statement that accounts and deployment were not configured. G12 remains partial until the owner checks above are completed.

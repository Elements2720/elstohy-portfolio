import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "elstohy-dev",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-10-03",
    compatibilityFlags: ["nodejs_compat"],
    assets: { notFoundHandling: "none" },
    env: {
      ASSETS: bindings.assets(),
      FIREBASE_PROJECT_ID: bindings.secret(),
      FIREBASE_WEB_API_KEY: bindings.secret(),
      CLOUDINARY_CLOUD_NAME: bindings.secret(),
      CLOUDINARY_API_KEY: bindings.secret(),
      CLOUDINARY_API_SECRET: bindings.secret(),
      SITE_URL: bindings.secret(),
    },
  }),
});

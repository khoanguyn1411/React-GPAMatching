/* eslint-disable @typescript-eslint/naming-convention */
/// <reference types="vite/client" />
interface ImportMetaEnv {
  /** Api base url. */
  readonly VITE_API_URL: string;

  /** Firebase config. */
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;

  // more env variables here...
}

interface ImportMeta {
  /** Contains application environment data. */
  readonly env: ImportMetaEnv;
}

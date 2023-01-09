/// <reference types="vite/client" />
interface ImportMetaEnv {
  /** Api base url. */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly VITE_API_URL: string;

  // more env variables here...
}

interface ImportMeta {
  /** Contains application environment data. */
  readonly env: ImportMetaEnv;
}

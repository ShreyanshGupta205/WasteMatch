/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMMA_API_KEY?: string;
  readonly VITE_GEMMA_MODEL?: string;
  readonly VITE_GEMMA_PROVIDER?: string;
  readonly [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

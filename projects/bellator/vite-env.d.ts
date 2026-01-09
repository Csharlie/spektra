/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_NAME: string
  readonly VITE_SITE_URL: string
  readonly VITE_WP_API_URL: string
  readonly VITE_WP_GRAPHQL_URL: string
  readonly VITE_WP_AUTH_TOKEN: string
  readonly VITE_DESIGN_SYSTEM: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

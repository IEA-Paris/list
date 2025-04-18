import type { ClientConfig } from "@nuxtjs/apollo"
declare module '#apollo' {
  export type ApolloClientKeys = 'default'
  export const NuxtApollo: {
    clients: Record<ApolloClientKeys, ClientConfig>
    clientAwareness: boolean
    proxyCookies: boolean
    cookieAttributes: ClientConfig['cookieAttributes']
  }
}
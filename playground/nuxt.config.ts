import config from "./static.config";
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@nuxtjs/apollo",
    "@pinia/nuxt",
    "../src/module",
    "@nuxtjs/mdc",
  ],
  list: {
    modules: [
      "events",
      "news",
      "people",
      "projects",
      "fellowships",
      "publications",
    ],
  },
  devtools: { enabled: true },
  compatibilityDate: "2025-04-08",
  apollo: {
    // https://apollo.nuxtjs.org/getting-started/configuration
    clients: {
      default: {
        httpEndpoint: config.graphqlEndpoint,
        httpLinkOptions: {
          headers: {
            "x-api-key": config.graphqlApiKey,
          },
        },
        inMemoryCacheOptions: {
          addTypename: false,
        },
      },
    },
  },
});
import config from "./static.config";
export default defineNuxtConfig({
  sourcemap: {
    server: true,
    client: true,
  },
  ssr: true,
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@nuxtjs/apollo",
    "@pinia/nuxt",
    "@nuxtjs/mdc",
    "../src/module",
  ],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: config.name,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: config.description },
        { name: "msapplication-TileColor", content: "#FFFFFF" },
        // PWA primary color
        { name: "theme-color", content: config.theme.themes.light.primary },
        // Facebook
        { property: "author", content: config.name },
        { property: "og:site_name", content: config.url },
        { property: "og:locale", content: "en_US" },
        { property: "og:type", content: "website" },
        // Twitter
        { property: "twitter:site", content: config.url },
        { property: "twitter:domain", content: config.url },
        { property: "twitter:creator", content: config.name },
        { property: "twitter:card", content: "summary" },
        { property: "twitter:image:src", content: "/images/icon.png" },
        { property: "og:url", content: config.url },
        { property: "og:title", content: config.name },
        { property: "og:description", content: config.description },
        { name: "twitter:site", content: config.url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: config.logo },
        { property: "og:image", content: config.logo },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
      ],
    },
  },
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
  i18n: {
    bundle: {
      optimizeTranslationDirective: false,
    },
    langDir: "../translations/",
    locales: config.lang.locales,
    defaultLocale: config.lang.default,
    baseUrl: config.url,
    lazy: true,
    detectBrowserLanguage: {
      alwaysRedirect: true,
      redirectOn: "root", // recommended
      fallbackLocale: "en",
      useCookie: true,
      cookieKey: "i18n_redirected",
    },
  },
});

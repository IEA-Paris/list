// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@nuxtjs/apollo",
    "@pinia/nuxt",
  ],
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["vuetify", "@paris-ias/list"],
  },
  i18n: {
    langDir: "translations/",
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
  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
})

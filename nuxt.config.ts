// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@nuxtjs/apollo",
    "@pinia/nuxt",
    "@nuxtjs/mdc",
  ],
  imports: {
    autoImport: false,
  },
  css: ["@mdi/font/css/materialdesignicons.min.css"],

  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
})

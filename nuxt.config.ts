// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@mdi-fonts",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@nuxtjs/apollo",
    "@pinia/nuxt",
  ],
  imports: {
    autoImport: false,
  },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["vuetify", "@paris-ias/list"],
  },
  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
});

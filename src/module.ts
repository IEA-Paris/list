import {
  defineNuxtModule,
  createResolver,
  addComponentsDir,
  addImportsDir,
  addPlugin,
} from "@nuxt/kit";

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@paris-ias/list",
    configKey: "list",
  },
  // Default configuration options of the Nuxt module
  defaults: {
    modules: [],
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);
    // Add components
    addComponentsDir({
      path: resolver.resolve("./runtime/components"),
      global: true,
    });

    // Add composables
    addImportsDir(resolver.resolve("./runtime/composables"));

    // Add graphQL queries
    addImportsDir(resolver.resolve("./runtime/graphql"));

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve("./runtime/plugins/pinia"));
    addPlugin(resolver.resolve("./runtime/plugins/vuetify"));

    // Serve the public directory
    nuxt.hook("nitro:config", async (nitroConfig) => {
      nitroConfig.publicAssets ||= [];
      nitroConfig.publicAssets.push({
        dir: resolver.resolve("./runtime/public"),
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
    });
    // Add translations

    nuxt.hook("i18n:registerModule", (register) => {
      register({
        // langDir path needs to be resolved
        langDir: resolver.resolve("./runtime/translations"),
        locales: [
          {
            code: "en",
            file: "en.json",
          },
          {
            code: "fr",
            file: "fr.json",
          },
        ],
      });
    });
    nuxt.options.runtimeConfig.public.list = options;

    // Add i18n configuration
    nuxt.options.i18n = {
      ...nuxt.options.i18n,
      langDir: resolver.resolve("./runtime/translations"),
    };

    /*     // Add Apollo configuration
    nuxt.options.apollo = {
      ...nuxt.options.apollo,
      clients: {
        default: {
          httpEndpoint: process.env.GRAPHQL_ENDPOINT || "",
          httpLinkOptions: {
            headers: {
              "x-api-key": process.env.GRAPHQL_API_KEY || "",
            },
          },
        },
      },
    } */

    // Add Vuetify configuration
    nuxt.options.build.transpile = [
      ...(nuxt.options.build.transpile || []),
      "vuetify",
    ];
    nuxt.options.css = [
      ...(nuxt.options.css || []),
      /*  "vuetify/lib/styles/main.sass", */
    ];

    nuxt.options.apollo = {
      ...nuxt.options.apollo,
    };

    // Add Vite configuration
    nuxt.options.vite = {
      ...nuxt.options.vite,
      define: {
        ...nuxt.options.vite?.define,
        "process.env.DEBUG": false,
      },
      css: {
        preprocessorOptions: {
          scss: {
            api: "modern-compiler",
          },
        },
      },
      build: {
        target: "esnext",
      },
    };
  },
});

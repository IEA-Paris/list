import type { AppConfig } from "nuxt/schema";
import { createDynamicStore } from "../stores/factory";
import { useRootStore } from "../stores/root";
import { defineNuxtPlugin, useAppConfig } from "#app";
export default defineNuxtPlugin(async (nuxtApp) => {
  const appConfig = useAppConfig() as AppConfig & {
    list: {
      modules: string[];
    };
  };

  // Define module imports
  const moduleImports = {
    events: () => ({
      model: import("@paris-ias/data/dist/list/events.js"),
      queries: {
        list: import("../graphql/list/events.gql"),
        get: import("../graphql/item/events.gql"),
      },
    }),
    news: () => ({
      model: import("@paris-ias/data/dist/list/news.js"),
      queries: {
        list: import("../graphql/list/news.gql"),
        get: import("../graphql/item/news.gql"),
      },
    }),
    people: () => ({
      model: import("@paris-ias/data/dist/list/people.js"),
      queries: {
        list: import("../graphql/list/people.gql"),
        get: import("../graphql/item/people.gql"),
      },
    }),
    projects: () => ({
      model: import("@paris-ias/data/dist/list/projects.js"),
      queries: {
        list: import("../graphql/list/projects.gql"),
        get: import("../graphql/item/projects.gql"),
      },
    }),
    fellowships: () => ({
      model: import("@paris-ias/data/dist/list/fellowships.js"),
      queries: {
        list: import("../graphql/list/fellowships.gql"),
        get: import("../graphql/item/fellowships.gql"),
      },
    }),
    publications: () => ({
      model: import("@paris-ias/data/dist/list/publications.js"),
      queries: {
        list: import("../graphql/list/publications.gql"),
        get: import("../graphql/item/publications.gql"),
      },
    }),

    // Add other modules similarly...
  };

  // Initialize empty stores object
  const stores: Record<string, any> = {};
  const queries = {};
  console.log("INITIALIZING STORES");
  // Preload all required modules
  await Promise.all(
    appConfig.list.modules.map(async (type) => {
      try {
        const imports = await moduleImports[
          type as keyof typeof moduleImports
        ]();
        const model = (await imports.model).default;
        queries[type] = {
          list: (await imports.queries.list).default,
          get: (await imports.queries.get).default,
        };

        stores[type] = createDynamicStore(type, model)();
      } catch (error) {
        console.error(`Failed to initialize ${type} store:`, error);
      }
    })
  );
  const rootStore = useRootStore();
  // Provide synchronous access to stores and queries
  nuxtApp.provide("rootStore", rootStore);
  nuxtApp.provide("stores", stores);
  nuxtApp.provide("queries", queries);
});

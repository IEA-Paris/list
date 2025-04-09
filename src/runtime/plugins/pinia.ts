import type { AppConfig } from "nuxt/schema";
import { createDynamicStore } from "../stores/factory";
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
        list: import("../graphql/queries/list/events.gql"),
        get: import("../graphql/queries/item/events.gql"),
      },
    }),
    news: () => ({
      model: import("@paris-ias/data/dist/list/news.js"),
      queries: {
        list: import("../graphql/queries/list/news.gql"),
        get: import("../graphql/queries/item/news.gql"),
      },
    }),
    people: () => ({
      model: import("@paris-ias/data/dist/list/people.js"),
      queries: {
        list: import("../graphql/queries/list/people.gql"),
        get: import("../graphql/queries/item/people.gql"),
      },
    }),
    projects: () => ({
      model: import("@paris-ias/data/dist/list/projects.js"),
      queries: {
        list: import("../graphql/queries/list/projects.gql"),
        get: import("../graphql/queries/item/projects.gql"),
      },
    }),
    fellowships: () => ({
      model: import("@paris-ias/data/dist/list/fellowships.js"),
      queries: {
        list: import("../graphql/queries/list/fellowships.gql"),
        get: import("../graphql/queries/item/fellowships.gql"),
      },
    }),
    publications: () => ({
      model: import("@paris-ias/data/dist/list/publications.js"),
      queries: {
        list: import("../graphql/queries/list/publications.gql"),
        get: import("../graphql/queries/item/publications.gql"),
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

  // Provide synchronous access to stores and queries
  nuxtApp.provide("stores", stores);
  nuxtApp.provide("queries", queries);
});

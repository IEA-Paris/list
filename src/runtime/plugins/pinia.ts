import type { AppConfig } from "nuxt/schema"
import { createDynamicStore } from "../stores/factory"
import { useRootStore } from "../stores/root"
import { defineNuxtPlugin, useAppConfig } from "#imports"

export default defineNuxtPlugin(async (nuxtApp) => {
  const appConfig = useAppConfig() as AppConfig & {
    list: {
      modules: string[]
    }
  }

  // Define module imports using the GraphQL client structure from @paris-ias/data
  // This imports GraphQL operations from the centralized types package
  // Only modules specified in appConfig.list.modules will be actually imported and initialized
  const moduleImports = {
    events: () => ({
      model: import("@paris-ias/data/dist/list/events.js"),
      queries: {
        list: import(
          "@paris-ias/data/dist/graphql/client/events/query.list.events.gql"
        ),
        get: import(
          "@paris-ias/data/dist/graphql/client/events/query.get.events.gql"
        ),
      },
    }),
    news: () => ({
      model: import("@paris-ias/data/dist/list/news.js"),
      queries: {
        list: import(
          "@paris-ias/data/dist/graphql/client/news/query.list.news.gql"
        ),
        get: import(
          "@paris-ias/data/dist/graphql/client/news/query.get.news.gql"
        ),
      },
    }),
    people: () => ({
      model: import("@paris-ias/data/dist/list/people.js"),
      queries: {
        list: import(
          "@paris-ias/data/dist/graphql/client/people/query.list.people.gql"
        ),
        get: import(
          "@paris-ias/data/dist/graphql/client/people/query.get.people.gql"
        ),
      },
    }),
    projects: () => ({
      model: import("@paris-ias/data/dist/list/projects.js"),
      queries: {
        list: import(
          "@paris-ias/data/dist/graphql/client/projects/query.list.projects.gql"
        ),
        get: import(
          "@paris-ias/data/dist/graphql/client/projects/query.get.projects.gql"
        ),
      },
    }),
    fellowships: () => ({
      model: import("@paris-ias/data/dist/list/fellowships.js"),
      queries: {
        list: import(
          "@paris-ias/data/dist/graphql/client/fellowships/query.list.fellowships.gql"
        ),
        get: import(
          "@paris-ias/data/dist/graphql/client/fellowships/query.get.fellowships.gql"
        ),
      },
    }),
    publications: () => ({
      model: import("@paris-ias/data/dist/list/publications.js"),
      queries: {
        list: import(
          "@paris-ias/data/dist/graphql/client/publications/query.list.publications.gql"
        ),
        get: import(
          "@paris-ias/data/dist/graphql/client/publications/query.get.publications.gql"
        ),
      },
    }),

    // Fixed: changed 'actions' to 'action' to match the actual module name
    action: () => ({
      model: import("@paris-ias/data/dist/list/actions.js"),
      queries: {
        list: import(
          "@paris-ias/data/dist/graphql/client/actions/query.list.actions.gql"
        ),
        get: import(
          "@paris-ias/data/dist/graphql/client/actions/query.get.actions.gql"
        ),
      },
    }),

    affiliation: () => ({
      model: import("@paris-ias/data/dist/list/affiliations.js"),
      queries: {
        list: import(
          "@paris-ias/data/dist/graphql/client/affiliations/query.list.affiliations.gql"
        ),
        get: import(
          "@paris-ias/data/dist/graphql/client/affiliations/query.get.affiliations.gql"
        ),
      },
    }),
    disciplines: () => ({
      model: import("@paris-ias/data/dist/list/disciplines.js"),
      queries: {
        list: import(
          "@paris-ias/data/dist/graphql/client/misc/query.list.disciplines.gql"
        ),
        get: import(
          "@paris-ias/data/dist/graphql/client/misc/query.get.disciplines.gql"
        ),
      },
    }),
    files: () => ({
      model: import("@paris-ias/data/dist/list/files.js"),
      queries: {
        list: import(
          "@paris-ias/data/dist/graphql/client/files/query.list.files.gql"
        ),
        get: import(
          "@paris-ias/data/dist/graphql/client/files/query.get.files.gql"
        ),
      },
    }),

    mailing: () => ({
      model: import("@paris-ias/data/dist/list/mailing.js"),
      queries: {
        list: import(
          "@paris-ias/data/dist/graphql/client/mailing/query.list.mailing.gql"
        ),
        get: import(
          "@paris-ias/data/dist/graphql/client/mailing/query.get.mailing.gql"
        ),
      },
    }),

    tags: () => ({
      model: import("@paris-ias/data/dist/list/tags.js"),
      queries: {
        list: import(
          "@paris-ias/data/dist/graphql/client/misc/query.list.tags.gql"
        ),
        get: import(
          "@paris-ias/data/dist/graphql/client/misc/query.get.tags.gql"
        ),
      },
    }),

    apps: () => ({
      model: import("@paris-ias/data/dist/list/apps.js"),
      queries: {
        list: import(
          "@paris-ias/data/dist/graphql/client/apps/query.list.apps.gql"
        ),
        get: import(
          "@paris-ias/data/dist/graphql/client/apps/query.get.apps.gql"
        ),
      },
    }),

    users: () => ({
      model: import("@paris-ias/data/dist/list/users.js"),
      queries: {
        list: import(
          "@paris-ias/data/dist/graphql/client/people/query.list.users.gql"
        ),
        get: import(
          "@paris-ias/data/dist/graphql/client/people/query.get.users.gql"
        ),
      },
    }),

    // Add other modules similarly...
  }

  // Initialize empty stores object
  const stores: Record<string, unknown> = {}
  const queries: Record<string, { list: unknown; get: unknown }> = {}
  const models: Record<string, unknown> = {}
  const rootStore = useRootStore()
  rootStore.setLoading(true)
  // Import filters from remote JSON
  const builtFilters = await import("../public/filters.json")

  console.log("INITIALIZING STORES")
  // Preload all required modules - only modules in appConfig.list.modules are loaded
  await Promise.all(
    appConfig.list.modules.map(async (type: string) => {
      try {
        const imports = await moduleImports[
          type as keyof typeof moduleImports
        ]()
        const model = (await imports.model).default
        queries[type] = {
          list: (await imports.queries.list).default,
          get: (await imports.queries.get).default,
        }
        models[type] = model
        stores[type] = createDynamicStore(type, model)()
      } catch (error) {
        console.error(`Failed to initialize ${type} store:`, error)
      }
    })
  )
  console.log(" STORES LOADED")

  rootStore.setLoading(false)

  // Provide synchronous access to stores and queries
  nuxtApp.provide("models", models)
  nuxtApp.provide("rootStore", rootStore)
  nuxtApp.provide("stores", stores)
  nuxtApp.provide("queries", queries)
  nuxtApp.provide("filters", builtFilters)
})

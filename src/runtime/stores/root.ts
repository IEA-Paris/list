import { defineStore } from "pinia"
import type { Views } from "@paris-ias/data"
import { useNuxtApp, useRouter } from "#imports"

// Improved TypeScript interfaces
interface SearchResults {
  events: Record<string, unknown>
  news: Record<string, unknown>
  people: Record<string, unknown>
  projects: Record<string, unknown>
  fellowships: Record<string, unknown>
  publications: Record<string, unknown>
  actions: Record<string, unknown>
  affiliations: Record<string, unknown>
  disciplines: Record<string, unknown>
  files: Record<string, unknown>
  mailing: Record<string, unknown>
  tags: Record<string, unknown>
}

interface Filter {
  value: unknown
  multiple?: boolean
}

interface StoreFilters {
  [key: string]: Filter
}

interface ModuleStore {
  loading?: boolean
  filters?: StoreFilters
  filtersCount?: number
  view?: Views & { name: string }
  views?: Record<string, Views>
  sortBy?: string[]
  sortDesc?: number[]
  itemsPerPage?: number
  total?: number
  numberOfPages?: number
  items?: unknown[]
  search?: string
}

interface NuxtAppExtended {
  $stores: Record<string, ModuleStore>
  $queries: Record<string, { list: unknown; get: unknown }>
  $models: Record<string, unknown>
}

interface RootStoreState {
  scrolled: boolean
  loading: boolean
  total: number
  skip: number
  page: number
  numberOfPages: number
  search: string
  results: SearchResults
}

interface GraphQLResult {
  data: {
    value?: {
      [key: string]: {
        items?: Array<{ id: string; [key: string]: unknown }>
        total?: number
      }
    }
  }
  error: { value?: unknown }
}

export const useRootStore = defineStore("rootStore", {
  state: (): RootStoreState => ({
    scrolled: typeof window !== "undefined" ? window.scrollY > 0 : false,
    loading: false,
    total: 0,
    skip: 0,
    page: 1,
    numberOfPages: 0,
    search: "",
    results: {
      events: {},
      news: {},
      people: {},
      projects: {},
      fellowships: {},
      publications: {},
      actions: {},
      affiliations: {},
      disciplines: {},
      files: {},
      mailing: {},
      tags: {},
    },
  }),

  actions: {
    setLoading(value: boolean, type: string = ""): void {
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>
      }
      this.loading = value
      if (type.length && type !== "all" && $stores[type]) {
        $stores[type].loading = value
      }
    },

    setScrolled(): void {
      if (typeof window !== "undefined") {
        this.scrolled = window.scrollY > 0
      }
    },

    loadRouteQuery(type: string): void {
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>
      }
      const { currentRoute } = useRouter()
      const query = currentRoute.value.query
      const filters = $stores[type]?.filters ?? {}

      if (Object.keys(query)?.length) {
        Object.keys(query).forEach((filter) => {
          if (filter in filters) {
            // set filter from query
            const queryValue = query[filter]
            if (typeof queryValue === "string") {
              filters[filter].value = filters[filter].multiple
                ? JSON.parse(queryValue)
                : queryValue
            }
          } else {
            // unknown filter key
          }
        })
      }
      // query loaded
    },

    /*     setFiltersCount(type: string): void {
  // setFiltersCount
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>
      }
      const filters = $stores[type]?.filters ?? {}
      for (const [key, value] of Object.entries(saved)) {
        if (filters[key]) {
          filters[key].value = value
        }
      }

      this.setFiltersCount(type)
      this.updateRouteQuery(type)
  // filters restored from localStorage
    },  */

    setFiltersCount(type: string): void {
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>
      }
      const filters = $stores[type]?.filters ?? {}
      const count = Object.values(filters).reduce((acc, filter) => {
        const value = filter?.value
        const isEmpty =
          value === undefined ||
          value === null ||
          (Array.isArray(value) && value.length === 0) ||
          (typeof value === "string" && value.trim() === "")

        return isEmpty ? acc : acc + 1
      }, 0)

      if ($stores[type]) {
        $stores[type].filtersCount = count
      }
    },

    updateRouteQuery(type: string): void {
      const router = useRouter()
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>
      }

      const routeQuery: Record<string, string> = {
        ...(this.search ? { search: this.search } : {}),
        ...(this.page > 1 ? { page: this.page.toString() } : {}),
        ...Object.entries($stores[type]?.filters ?? {}).reduce(
          (acc, [key, filter]) => {
            const value = filter?.value
            const isEmpty =
              value === undefined ||
              value === null ||
              value === false ||
              (Array.isArray(value) && value.length === 0) ||
              (typeof value === "string" && value.trim() === "")

            if (isEmpty) return acc

            return {
              ...acc,
              [key]: Array.isArray(value)
                ? JSON.stringify(value)
                : String(value),
            }
          },
          {} as Record<string, string>,
        ),
      }

      router.replace({ query: routeQuery })
    },

    async resetState(type: string, lang: string = "en"): Promise<void> {
      const { $stores, $models } = useNuxtApp() as NuxtAppExtended

      const moduleState = $stores[type]
      const model = $models[type] as Partial<ModuleStore> | undefined

      if (moduleState && model) {
        const clone = <T>(o: T): T =>
          typeof structuredClone === "function"
            ? structuredClone(o)
            : JSON.parse(JSON.stringify(o))

        moduleState.search = ""
        moduleState.filters = clone(model.filters ?? {})
        moduleState.view = model.views
          ? {
              ...clone(model.views[Object.keys(model.views)[0]] as Views),
              name: Object.keys(model.views)[0],
            }
          : undefined
        moduleState.sortBy = clone((model.sortBy as string[]) ?? ["date"])
        moduleState.sortDesc = clone((model.sortDesc as number[]) ?? [0])
        moduleState.itemsPerPage = (model.itemsPerPage as number) ?? 10
        moduleState.items = []
        moduleState.total = 0
        moduleState.numberOfPages = 0
        moduleState.loading = false
      }

      this.$patch({
        search: "",
        page: 1,
        scrolled: false,
        loading: false,
        total: 0,
        skip: 0,
        numberOfPages: 0,
      })

      this.updateRouteQuery(type)
    },
    async updateSort({
      value,
      type,
      lang = "en",
    }: {
      value: (number | string)[]
      type: string
      lang?: string
    }): Promise<void> {
      // update sort
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>
      }
      if ($stores[type]) {
        $stores[type].sortBy = [String(value[0])]
        $stores[type].sortDesc = [Number(value[1])]
      }
      this.page = 1
      {
        const { $stores } = useNuxtApp() as {
          $stores: Record<string, ModuleStore>
        }
        if ($stores[type]) $stores[type].loading = true
      }
      /* this.updateLocalStorage(type + "_sort", value.join("_")) */
      this.updateRouteQuery(type)
    },

    async updateView({
      value,
      type,
      lang,
    }: {
      value: string
      type: string
      lang?: string
    }): Promise<void> {
      // update view
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>
      }
      if ($stores[type]?.views?.[value]) {
        $stores[type].view = {
          ...$stores[type].views![value],
          name: value,
        }
        $stores[type].loading = true
      }
      /* this.updateLocalStorage(type + "_view", value) */
    },

    /*     updateLocalStorage(key: string, value: string): void {
      const local = JSON.parse(localStorage.getItem("PARIS_IAS") || "{}")
      local[key] = value
      localStorage.setItem("PARIS_IAS", JSON.stringify(local))
    }, */

    async updateFilter(
      key: string,
      val: unknown,
      type: string,
      lang: string,
    ): Promise<void> {
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>
      }
      // update filter value

      if ($stores[type]?.filters?.[key]) {
        $stores[type].filters![key].value = val
      }

      this.page = 1
      {
        const { $stores } = useNuxtApp() as {
          $stores: Record<string, ModuleStore>
        }
        if ($stores[type]) $stores[type].loading = true
      }
      this.setFiltersCount(type)
      this.updateRouteQuery(type)
    },

    async updateItemsPerPage({
      value,
      type,
      lang,
    }: {
      value: number
      type: string
      lang?: string
    }): Promise<void> {
      // update items per page
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>
      }
      this.page = 1
      {
        const { $stores } = useNuxtApp() as {
          $stores: Record<string, ModuleStore>
        }
        if ($stores[type]) {
          $stores[type].itemsPerPage = value
          $stores[type].loading = true
        }
      }
      this.updateRouteQuery(type)
    },

    async updatePage({
      page,
      type,
      lang = "en",
    }: {
      page: number
      type: string
      lang?: string
    }): Promise<void> {
      // update page
      const router = useRouter()
      const currentQuery = router.currentRoute.value.query

      const newQuery: Record<string, string> = { ...currentQuery } as Record<
        string,
        string
      >
      if (page > 1) {
        newQuery.page = page.toString()
      } else {
        delete (newQuery as any).page
      }
      this.page = page
      {
        const { $stores } = useNuxtApp() as {
          $stores: Record<string, ModuleStore>
        }
        if ($stores[type]) $stores[type].loading = true
      }
      router.replace({ query: newQuery })
    },
    /* 
    initializePageFromRoute(): void {
      const { query } = useRouter().currentRoute.value
      const page = Number.parseInt(query.page as string, 10)
      this.page = isNaN(page) || page < 1 ? 1 : page
    }, */

    async updateSearch({
      type = "all",
      search = "",
      lang = "en",
    }: {
      type: string
      search: string
      lang: string
    }): Promise<void> {
      const { $stores } = useNuxtApp()
      // update search
      if (type === "all") {
        this.search = search
      } else {
        const { $stores } = useNuxtApp() as {
          $stores: Record<string, ModuleStore>
        }
        if ($stores[type]) {
          ;($stores[type] as any).search = search
          $stores[type].loading = true
        }
      }
      this.page = 1
      this.updateRouteQuery(type)
    },

    buildListVariables(type: string, lang: string = "en") {
      const { $stores } = useNuxtApp() as NuxtAppExtended
      const itemsPerPage =
        type === "all" ? 3 : ($stores[type]?.itemsPerPage as number) || 10
      // Touch view name to make this computed depend on it (triggers refetch on view change)
      const _viewName = $stores[type]?.view && ($stores[type].view as any).name

      const filters: Record<string, unknown> = {}
      if (type !== "all") {
        const storeFilters = $stores[type]?.filters ?? {}
        for (const filter in storeFilters) {
          const filterValue = storeFilters[filter]?.value
          if (
            typeof filterValue !== "undefined" &&
            filterValue !== null &&
            (Array.isArray(filterValue) ? filterValue.length > 0 : true)
          ) {
            filters[filter] = filterValue
          }
        }
      }

      const args = JSON.parse(
        JSON.stringify({
          options: {
            skip: +this.page === 1 ? 0 : (+this.page - 1) * itemsPerPage,
            limit: itemsPerPage,
            sortBy:
              type === "all"
                ? "searchScore"
                : $stores[type]?.sortBy || ["created"],
            sortDesc:
              type === "all"
                ? -1
                : ($stores[type]?.sortDesc?.[0] || 0) > 0
                  ? true
                  : false,
            ...((this.search as string)?.length &&
              type !== "all" && { search: this.search }),
            filters,
          },
          ...(type === "all" &&
            (this.search as string)?.length && { search: this.search }),
          ...(type !== "all" &&
            ($stores[type].search as string)?.length && {
              search: $stores[type].search,
            }),
          appId: "iea",
          lang,
        }),
      )
      args.options.filters = JSON.stringify(args.options.filters)
      return args
    },

    applyListResult(
      type: string,
      data: Record<string, any>,
      itemsPerPageOverride?: number,
    ) {
      const { $stores } = useNuxtApp() as NuxtAppExtended
      const key =
        type === "all"
          ? "search"
          : "list" + type.charAt(0).toUpperCase() + type.slice(1)

      if (type === "all") {
        this.results = (data?.[key] as SearchResults) || this.results
        return
      }

      const items = data?.[key]?.items ?? []
      if ($stores[type]) {
        const itemsPerPage =
          itemsPerPageOverride || ($stores[type].itemsPerPage as number) || 10

        $stores[type].total = data?.[key]?.total || 0
        const result = {
          ...data?.[key],
          items: items.map(({ id, ...rest }: any) => ({
            ...rest,
            _path: `/${id}`,
          })),
        }
        $stores[type].items = result.items
        const lastPage = Math.ceil((result.total || 0) / itemsPerPage)
        this.setFiltersCount(type)
        $stores[type].numberOfPages = lastPage
      }
    },
  },
})

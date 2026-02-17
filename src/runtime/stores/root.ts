import { defineStore } from "pinia"
import type { Views } from "@paris-ias/trees"
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
  sort?: Record<string, { label: string; default?: boolean; icon?: string }>
  itemsPerPage?: number
  total?: number
  numberOfPages?: number
  items?: unknown[]
  search?: string
  page: number
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

export const useRootStore = defineStore("rootStore", {
  state: (): RootStoreState => ({
    scrolled: typeof window !== "undefined" ? window.scrollY > 0 : false,
    loading: true,
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
      if (type.length && $stores[type]) {
        $stores[type].loading = value
      } else {
        this.loading = value
      }
    },

    setScrolled(): void {
      if (typeof window !== "undefined") {
        this.scrolled = window.scrollY > 0
      }
    },

    loadRouteQuery(type: string): void {
      /*    console.log("0 - loadRouteQuery", type) */
      const { currentRoute } = useRouter()
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>
      }
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

      if (query.search && typeof query.search === "string") {
        if (type === "all") {
          this.search = query.search
        } else if ($stores[type]) {
          ;($stores[type] as any).search = query.search
        }
      }

      const page = parseInt(query.page as string, 10) || 1
      if (type === "all") {
        this.page = page
      } else if ($stores[type]) {
        $stores[type].page = page
      }
    },
    setFiltersCount(type: string): void {
      /*     console.log("6- setFiltersCount", type) */
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

      $stores[type].filtersCount = count
    },

    updateRouteQuery(type: string): void {
      /*       console.log("5- updateRouteQuery", type) */
      const router = useRouter()
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>
      }

      const isGlobal = type === "all"
      const searchValue = isGlobal
        ? this.search
        : (($stores[type] as any)?.search as string) || ""
      const pageValue = isGlobal ? this.page : $stores[type]?.page || 1

      const routeQuery: Record<string, string> = {
        ...(searchValue ? { search: searchValue } : {}),
        ...(pageValue > 1 ? { page: pageValue.toString() } : {}),
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
    resetState(type: string, lang: string = "en"): void {
      /*   console.log("Y - resetState", { type, lang }) */
      const { $stores, $models } = useNuxtApp() as NuxtAppExtended
      const model = structuredClone($models[type]) as
        | Partial<ModuleStore>
        | undefined
      $stores[type].filters = model?.filters
      $stores[type].search = ""
      $stores[type].page = 1
      ;($stores[type] as any).sortKey = null
    },
    updateSort({ type, sortKey }: { type: string; sortKey: string }): void {
      /*       console.log("Z - updateSort", {
        type,
        sortKey,
      }) */
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>
      }

      $stores[type].page = 1
      ;($stores[type] as any).sortKey = sortKey
      $stores[type].loading = true
    },

    updateView({
      value,
      type,
      lang,
    }: {
      value: string
      type: string
      lang?: string
    }): void {
      /* console.log("W - updateView", { value, type }) */
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>
      }
      if ($stores[type]?.views?.[value]) {
        $stores[type].view = {
          ...$stores[type].views![value],
          name: value,
        }
      }
      /* this.updateLocalStorage(type + "_view", value) */
    },

    /*     updateLocalStorage(key: string, value: string): void {
      const local = JSON.parse(localStorage.getItem("PARIS_IAS") || "{}")
      local[key] = value
      localStorage.setItem("PARIS_IAS", JSON.stringify(local))
    }, */

    updateFilter(key: string, val: unknown, type: string, lang: string): void {
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>
      }
      /* console.log("R - update filter: ", { key, val, type }) */

      if ($stores[type]?.filters?.[key]) {
        $stores[type].filters![key].value = val
      }

      if (type === "all") {
        this.page = 1
      } else {
        $stores[type].page = 1
      }
      $stores[type].loading = true
      this.setFiltersCount(type)
      this.updateRouteQuery(type)
    },

    updateItemsPerPage({
      value,
      type,
      lang,
    }: {
      value: number
      type: string
      lang?: string
    }): void {
      /* console.log("H - updateItemsPerPage", { value, type }) */
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>
      }
      if (type === "all") {
        this.page = 1
      } else {
        $stores[type].page = 1
      }
      $stores[type].itemsPerPage = value
      $stores[type].loading = true
      this.updateRouteQuery(type)
    },

    updatePage({
      page,
      type,
      lang = "en",
    }: {
      page: number
      type: string
      lang?: string
    }): void {
      // update page
      /* console.log("update page: ", page) */
      const router = useRouter()
      const currentQuery = router.currentRoute.value.query

      const newQuery: Record<string, string> = { ...currentQuery } as Record<
        string,
        string
      >

      if (type !== "all") {
        const { $stores } = useNuxtApp() as {
          $stores: Record<string, ModuleStore>
        }
        $stores[type].page = page
        $stores[type].loading = true
      } else {
        this.page = page
      }
      if (page > 1) {
        newQuery.page = page.toString()
      } else {
        delete (newQuery as any).page
      }
      router.push({ query: newQuery })
    },

    updateSearch({
      type = "all",
      search = "",
      lang = "en",
    }: {
      type: string
      search: string
      lang: string
    }): void {
      if (type === "all") {
        this.search = search
        this.page = 1
      } else {
        const { $stores } = useNuxtApp() as {
          $stores: Record<string, ModuleStore>
        }
        if ($stores[type]) {
          ;($stores[type] as any).search = search
          $stores[type].page = 1
          $stores[type].loading = true
        }
      }
      this.updateRouteQuery(type)
    },

    buildListVariables(type: string, lang: string = "en") {
      const { $stores } = useNuxtApp() as NuxtAppExtended
      const itemsPerPage =
        type === "all" ? 3 : ($stores[type]?.itemsPerPage as number) || 10

      const filters: Record<string, unknown> = {}
      if (type !== "all") {
        const storeFilters = $stores[type]?.filters ?? {}
        for (const filter in storeFilters) {
          const filterValue = storeFilters[filter]?.value
          if (
            typeof filterValue !== "undefined" &&
            filterValue !== "" &&
            filterValue !== null &&
            (Array.isArray(filterValue) ? filterValue.length > 0 : true)
          ) {
            filters[filter] = filterValue
          }
        }
      }

      const localSearch = (($stores[type] as any)?.search as string) || ""

      const args = JSON.parse(
        JSON.stringify({
          options: {
            skip:
              +$stores[type]?.page === 1
                ? 0
                : (+$stores[type]?.page - 1) * itemsPerPage,
            limit: itemsPerPage,
            ...(type !== "all" &&
              localSearch?.length && { search: localSearch }),
            filters,
            sort:
              ($stores[type] as any)?.sortKey ||
              ($stores[type]?.sort
                ? Object.keys($stores[type].sort).find(
                    (key) => $stores[type].sort![key].default,
                  )
                : undefined),
          },
          ...(type === "all" &&
            (this.search as string)?.length && { search: this.search }),
          ...(type !== "all" && localSearch?.length && { search: localSearch }),
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
        for (const category of Object.keys(this.results)) {
          const categoryData = this.results[
            category as keyof SearchResults
          ] as any
          if (categoryData?.items?.length) {
            categoryData.items.sort(
              (a: any, b: any) => (b.score ?? 0) - (a.score ?? 0),
            )
          }
        }
        return
      }

      const items = data?.[key]?.items ?? []
      if ($stores[type]) {
        const itemsPerPage =
          itemsPerPageOverride || ($stores[type].itemsPerPage as number) || 10

        $stores[type].total = data?.[key]?.total || 0
        const result = {
          ...data?.[key],
          items,
        }
        $stores[type].items = result.items
        const lastPage = Math.ceil((result.total || 0) / itemsPerPage)
        this.setFiltersCount(type)
        $stores[type].numberOfPages = lastPage
      }
    },
  },
})

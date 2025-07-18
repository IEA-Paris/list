import { defineStore } from "pinia";
import type { Views } from "@paris-ias/data";
import SEARCH from "../graphql/list/search.gql";
import { useNuxtApp, useRouter, useAsyncQuery } from "#imports";

// Improved TypeScript interfaces
interface SearchResults {
  events: Record<string, unknown>;
  news: Record<string, unknown>;
  people: Record<string, unknown>;
  projects: Record<string, unknown>;
  fellowships: Record<string, unknown>;
  publications: Record<string, unknown>;
  actions: Record<string, unknown>;
  affiliations: Record<string, unknown>;
  disciplines: Record<string, unknown>;
  files: Record<string, unknown>;
  mailing: Record<string, unknown>;
  tags: Record<string, unknown>;
}

interface Filter {
  value: unknown;
  multiple?: boolean;
}

interface StoreFilters {
  [key: string]: Filter;
}

interface ModuleStore {
  loading?: boolean;
  filters?: StoreFilters;
  filtersCount?: number;
  view?: Views & { name: string };
  views?: Record<string, Views>;
  sortBy?: string[];
  sortDesc?: number[];
  itemsPerPage?: number;
  total?: number;
  numberOfPages?: number;
  items?: unknown[];
}

interface NuxtAppExtended {
  $stores: Record<string, ModuleStore>;
  $queries: Record<string, { list: unknown; get: unknown }>;
  $models: Record<string, unknown>;
}

interface RootStoreState {
  scrolled: boolean;
  loading: boolean;
  total: number;
  skip: number;
  page: number;
  numberOfPages: number;
  search: string;
  results: SearchResults;
}

interface GraphQLResult {
  data: {
    value?: {
      [key: string]: {
        items?: Array<{ id: string; [key: string]: unknown }>;
        total?: number;
      };
    };
  };
  error: { value?: unknown };
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
      console.log("setLoading", { value, type });
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>;
      };
      this.loading = value;
      if (type.length && type !== "all" && $stores[type]) {
        $stores[type].loading = value;
      }
    },

    setScrolled(): void {
      if (typeof window !== "undefined") {
        this.scrolled = window.scrollY > 0;
      }
    },

    /*     saveFiltersToLocalStorage(type: string): void {
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>;
      };
      const filters = $stores[type]?.filters ?? {};
      const values = Object.fromEntries(
        Object.entries(filters).map(([key, filter]) => [key, filter.value])
      );

      const local = JSON.parse(localStorage.getItem("PARIS_IAS") || "{}");
      local[`${type}_filters`] = values;
      localStorage.setItem("PARIS_IAS", JSON.stringify(local));
    }, */

    loadRouteQuery(type: string): void {
      console.log("loadRouteQuery", type);
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>;
      };
      const { currentRoute } = useRouter();
      const query = currentRoute.value.query;
      const filters = $stores[type]?.filters ?? {};
      console.log("filters: ", filters);

      if (Object.keys(query)?.length) {
        Object.keys(query).forEach((filter) => {
          if (filter in filters) {
            console.log("filter: ", filter, query[filter]);
            const queryValue = query[filter];
            if (typeof queryValue === "string") {
              filters[filter].value = filters[filter].multiple
                ? JSON.parse(queryValue)
                : queryValue;
            }
          } else {
            console.log("unknown filter: ", filter);
          }
        });
      }
      console.log("query loaded");
    },

    /*  loadFiltersFromLocalStorage(type: string): void {
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>
      }
      const local = JSON.parse(localStorage.getItem("PARIS_IAS") || "{}")
      const saved = local[`${type}_filters`] ?? null

      if (!saved) {
        console.log(`[${type}] No data to restore.`)
        return
      }

      const filters = $stores[type]?.filters ?? {}
      for (const [key, value] of Object.entries(saved)) {
        if (filters[key]) {
          filters[key].value = value
        }
      }

      this.setFiltersCount(type)
      this.updateRouteQuery(type)
      console.log(`[${type}] Filters restored from localStorage`, saved)
    }, */

    setFiltersCount(type: string): void {
      console.log("setFiltersCount", type);
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>;
      };
      const filters = $stores[type]?.filters ?? {};
      const count = Object.values(filters).reduce((acc, filter) => {
        const value = filter?.value;
        const isEmpty =
          value === undefined ||
          value === null ||
          (Array.isArray(value) && value.length === 0) ||
          (typeof value === "string" && value.trim() === "");

        return isEmpty ? acc : acc + 1;
      }, 0);

      if ($stores[type]) {
        $stores[type].filtersCount = count;
      }
    },

    updateRouteQuery(type: string): void {
      console.log("updateRouteQuery", type);
      const router = useRouter();
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>;
      };

      const routeQuery: Record<string, string> = {
        ...(this.search ? { search: this.search } : {}),
        ...(this.page > 1 ? { page: this.page.toString() } : {}),
        ...Object.entries($stores[type]?.filters ?? {}).reduce(
          (acc, [key, filter]) => {
            const value = filter?.value;
            const isEmpty =
              value === undefined ||
              value === null ||
              value === false ||
              (Array.isArray(value) && value.length === 0) ||
              (typeof value === "string" && value.trim() === "");

            if (isEmpty) return acc;

            return {
              ...acc,
              [key]: Array.isArray(value)
                ? JSON.stringify(value)
                : String(value),
            };
          },
          {} as Record<string, string>
        ),
      };

      router.replace({ query: routeQuery });
    },

    async resetState(type: string, lang: string): void {
      console.log("resetState", { type, lang });
      const { $stores, $models } = useNuxtApp() as NuxtAppExtended;
      console.log("$models[type]: ", $models[type]);
      console.log("$stores[type]: ", $stores[type]);

      if ($models[type] && $stores[type]) {
        $stores[type].filters = $models[type].filters;
      }

      console.log("resetState");
      this.search = "";
      this.page = 1;
      this.scrolled = false;
      this.loading = false;
      this.total = 0;
      this.skip = 0;
      this.numberOfPages = 0;
      await this.update(type, lang);
    },

    async updateSort({
      value,
      type,
      lang = "en",
    }: {
      value: (number | string)[];
      type: string;
      lang?: string;
    }): void {
      console.log("updateSort", {
        value,
        type,
      });
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>;
      };
      if ($stores[type]) {
        $stores[type].sortBy = [String(value[0])];
        $stores[type].sortDesc = [Number(value[1])];
      }
      this.page = 1;
      /* this.updateLocalStorage(type + "_sort", value.join("_")) */
      await this.update(type, lang);
    },

    async updateView({
      value,
      type,
      lang,
    }: {
      value: string;
      type: string;
      lang?: string;
    }): void {
      console.log("updateView", { value, type });
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>;
      };
      if ($stores[type]?.views?.[value]) {
        $stores[type].view = {
          ...$stores[type].views![value],
          name: value,
        };
      }
      /* this.updateLocalStorage(type + "_view", value) */
      await this.update(type, lang);
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
      lang: string
    ): void {
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>;
      };
      console.log("update filter: ", { key, val, type });

      if ($stores[type]?.filters?.[key]) {
        $stores[type].filters![key].value = val;
      }

      this.page = 1;
      await this.update(type, lang);
    },

    async updateItemsPerPage({
      value,
      type,
      lang,
    }: {
      value: number;
      type: string;
      lang?: string;
    }): void {
      console.log("updateItemsPerPage", { value, type });
      const { $stores } = useNuxtApp() as {
        $stores: Record<string, ModuleStore>;
      };
      this.page = 1;
      if ($stores[type]) {
        $stores[type].itemsPerPage = value;
      }
      await this.update(type, lang);
    },

    async updatePage({
      page,
      type,
      lang = "en",
    }: {
      page: number;
      type: string;
      lang?: string;
    }): Promise<void> {
      console.log("updatePage", { page, type });
      const router = useRouter();
      const currentQuery = router.currentRoute.value.query;

      const newQuery = { ...currentQuery };
      if (page > 1) {
        newQuery.page = page.toString();
      } else {
        delete newQuery.page;
      }
      this.page = page;
      await this.update(type, lang);
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
      type: string;
      search: string;
      lang: string;
    }): Promise<void> {
      const { $stores } = useNuxtApp();
      console.log("updateSearch", { type, search, lang });
      if (type === "all") {
        this.search = search;
      } else {
        if ($stores[type]) {
          $stores[type].search = search;
        }
      }

      await this.update(type, lang);
    },

    async update(type: string, lang: string = "en"): Promise<boolean> {
      const { $stores, $queries } = useNuxtApp() as NuxtAppExtended;
      console.log("update", { type, lang });

      this.setLoading(true);

      if (type !== "all" && $stores[type]) {
        $stores[type].loading = true;
      }

      const itemsPerPage =
        type === "all" ? 3 : ($stores[type]?.itemsPerPage as number) || 10;
      const filters: Record<string, unknown> = {};

      if (type !== "all") {
        const storeFilters = $stores[type]?.filters ?? {};
        for (const filter in storeFilters) {
          const filterValue = storeFilters[filter]?.value;

          // Prune empty values
          if (
            typeof filterValue !== "undefined" &&
            filterValue !== null &&
            (Array.isArray(filterValue) ? filterValue.length > 0 : true)
          ) {
            filters[filter] = filterValue;
          }
        }
      }

      const args = JSON.parse(
        JSON.stringify({
          options: {
            // skip
            skip: +this.page === 1 ? 0 : (+this.page - 1) * itemsPerPage,
            // limit
            limit: itemsPerPage,
            // sort, array of keys and array of directions - to have x tie breakers if necessary
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
            // search (if set)
            ...((this.search as string)?.length &&
              type !== "all" && { search: this.search }),
            // add the store module filters
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
        })
      );

      args.options.filters = JSON.stringify(args.options.filters);
      console.log("args: ", args);
      /* 
      console.log(`Fetching ${type}`) */

      const { data, error } = (await useAsyncQuery(
        type === "all" ? SEARCH : $queries[type]?.list,
        args
      )) as GraphQLResult;

      console.log("data: ", data);
      if (error.value) console.log(error.value);

      const key =
        type === "all"
          ? "search"
          : "list" + type.charAt(0).toUpperCase() + type.slice(1);

      if (type === "all") {
        this.results = (data?.value?.[key] as SearchResults) || this.results;
      } else {
        const items = data?.value?.[key]?.items ?? [];
        if ($stores[type]) {
          $stores[type].total = data?.value?.[key]?.total || 0;
          const result = {
            ...data?.value?.[key],
            items: items.map(({ id, ...rest }) => ({
              ...rest,
              _path: `/${id}`,
            })),
          };
          $stores[type].items = result.items;

          const lastPage = Math.ceil((result.total || 0) / itemsPerPage);
          this.setFiltersCount(type);
          $stores[type].numberOfPages = lastPage;
        }
      }
      this.updateRouteQuery(type);
      this.setLoading(false, type);
      return true;
    },
  },
});

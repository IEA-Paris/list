/* import filtersRaw from '~/assets/data/filters'
import lists from '~/assets/data/lists' */

/* import api from "~/server/api/github" */
import { defineStore } from "pinia";
import type { Views, ModuleType } from "@paris-ias/data";
import SEARCH from "../graphql/list/search.gql";
import { useNuxtApp, useRouter, useAsyncQuery } from "#imports";
export const useRootStore = defineStore("rootStore", {
  state: (): Record<
    string,
    boolean | number | string | ModuleType | searchResults
  > => ({
    scrolled: import.meta.browser ? window.scrollY > 0 : false,
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
    },
  }),

  actions: {
    setLoading(value: boolean, type: string = "") {
      const { $stores } = useNuxtApp();
      this.loading = value;
      if (type.length) $stores[type].loading = value;
    },
    setScrolled() {
      if (import.meta.browser) {
        this.scrolled = window.scrollY > 0;
      }
    },
    saveFiltersToLocalStorage(type: string) {
      const { $stores } = useNuxtApp();
      const filters = $stores[type].filters ?? {};
      const values = Object.fromEntries(
        Object.entries(filters).map(([key, filter]) => [key, filter.value])
      );

      const local = JSON.parse(localStorage.getItem("PARIS_IAS") || "{}");
      local[`${type}_filters`] = values;
      localStorage.setItem("PARIS_IAS", JSON.stringify(local));
    },
    loadRouteQuery(type: string) {
      const { $stores } = useNuxtApp();
      const { currentRoute } = useRouter();
      const query = currentRoute.value.query;
      const filters = $stores[type].filters;

      if (Object.keys(query)?.length) {
        Object.keys(query).forEach((filter) => {
          if (filter in filters) {
            filters[filter].value = filters[filter].multiple
              ? JSON.parse(query[filter] as string)
              : query[filter];
          }
        });
        /*       if (query.view) {
        ;$stores[type].view = query.view as
          | string
          | Views
          | undefined
      }
      if (query.page) {
        this.page = +query.page
      } else {
        this.page = 1
      } */

        /*      const sortObj = $stores[type].sort
      const defaultSortKey = Object.keys(sortObj).find(
        (item) => sortObj[item].default === true,
      )
      const defaultSort = [sortObj[defaultSortKey as string]]

      const sortDesc = $stores[type].sortDesc
      let sortDescItem
      sortDescItem = (sortDesc as number[] | boolean[])[0]

      if (query.sortBy) {
        ;$stores[type].sortBy = [query.sortBy] as string[]
      }
      if (typeof query.sortDesc !== "undefined") {
        sortDescItem = !!(query.sortDesc === "true")
      } else {
        sortDescItem = defaultSort[0].value[1]
      } */
      }
      console.log("query loaded");
      this.setFiltersCount(type);
    },

    loadFiltersFromLocalStorage(type: string) {
      const { $stores } = useNuxtApp();
      const local = JSON.parse(localStorage.getItem("PARIS_IAS") || "{}");
      const saved = local[`${type}_filters`] ?? null;

      if (!saved) {
        console.log(`[${type}] Aucune donnée à restaurer.`);
        return;
      }

      const filters = $stores[type].filters ?? {};
      for (const [key, value] of Object.entries(saved)) {
        if (filters[key]) {
          filters[key].value = value;
        }
      }

      this.setFiltersCount(type);
      this.updateRouteQuery(type);
      console.log(`[${type}] Filtres restaurés depuis localStorage`, saved);
    },

    setFiltersCount(type: string) {
      const { $stores } = useNuxtApp();
      const filters = $stores[type].filters ?? {};
      const count = Object.values(filters).reduce((acc, filter) => {
        const value = filter?.value;
        const isEmpty =
          value === undefined ||
          value === null ||
          (Array.isArray(value) && value.length === 0) ||
          (typeof value === "string" && value.trim() === "");

        return isEmpty ? acc : acc + 1;
      }, 0);
      $stores[type].filtersCount = count;
    },
    setBlankFilterLoad(type: string) {
      /*  ;(this[type] as ModuleType).loading = false */
    },
    setDefaults() {
      // lang
      const lang = localStorage.getItem("lang");
      /*    if(lang)i18n.global.locale = lang; */
      // dark mode

      // event
      // people
      // news
      // project
      // fellowships
    },
    updateRouteQuery(type: string) {
      const router = useRouter();
      const { $stores } = useNuxtApp();

      const routeQuery: Record<string, string> = {
        ...(this.search ? { search: this.search } : {}),
        ...(this.page > 1 ? { page: this.page.toString() } : {}),
        ...Object.entries($stores[type].filters).reduce(
          (acc, [key, filter]) => {
            const value = filter?.value;

            console.log("valueStore", value);
            const isEmpty =
              value === undefined ||
              value === null ||
              value === false ||
              (Array.isArray(value) && value.length === 0) ||
              (typeof value === "string" && value.trim() === "");

            if (isEmpty) return acc;

            return {
              ...acc,
              [key]: Array.isArray(value) ? JSON.stringify(value) : value,
            };
          },
          {}
        ),
      };

      router.replace({ query: routeQuery });
    },
    resetState(type: string) {
      const { $stores, $models } = useNuxtApp();
      console.log("$models[type]: ", $models[type]);
      $stores[type] = $models[type];
      console.log("resetState");
      this.search = "";
      this.page = 1;
      this.scrolled = false;
      this.loading = false;
      this.total = 0;
      this.skip = 0;
      this.numberOfPages = 0;
      this.setFiltersCount(type);
      this.updateRouteQuery(type);
    },
    updateSort({ value, type }: { value: number[] | string[]; type: string }) {
      const { $stores } = useNuxtApp();
      $stores[type].sortBy = [value[0]] as string[];
      $stores[type].sortDesc = [value[1]] as number[];
      this.page = 1;
      this.updateLocalStorage(type + "_sort", value.join("_"));
      this.update(type);
    },
    updateView({ value, type }: { value: string; type: string }) {
      const { $stores } = useNuxtApp();
      $stores[type].view = {
        ...($stores[type].views[value] as Views),
        name: value,
      };
      this.updateLocalStorage(type + "_view", value);
      this.update(type);
    },
    updateLocalStorage(key: string, value: string) {
      const local = JSON.parse(localStorage.getItem("PARIS_IAS") as any) || {};
      local[key] = value;
      localStorage.setItem("PARIS_IAS", JSON.stringify(local));
    },
    updateFilter(key: string, val: any, type: string) {
      const { $stores } = useNuxtApp();
      console.log("update filter: ", { key, val, type });
      $stores[type].filters[key].value = val;

      this.setFiltersCount(type);

      this.saveFiltersToLocalStorage(type);

      // const router = useRouter()

      // // Update the route query with the new filter
      // console.log(
      //   "router.currentRoute.value.query: ",
      //   router.currentRoute.value.query,
      // )
      // const query = {
      //   ...router.currentRoute.value.query,
      //   [key]: Array.isArray(val) ? JSON.stringify(val) : val,
      // }
      // router.push({ query })

      this.updateRouteQuery(type);

      this.page = 1;
      this.update(type);
    },
    updateItemsPerPage({ value, type }: { value: number; type: string }) {
      const { $stores } = useNuxtApp();
      this.page = 1;
      $stores[type].itemsPerPage = value;

      this.update(type);
    },
    updatePage({ page, type }: { page: number; type: string }) {
      this.page = page;
      this.update(type);
    },
    async updateSearch({
      type = "all",
      search = "",
      lang = "en",
    }: {
      type: string;
      search: string;
      lang: string;
    }) {
      this.search = search;
      /*   console.log("updateSearch: ", search + " " + lang) */
      this.setLoading(true);

      await this.update(type, lang);
    },

    async update(type: string, lang: string = "en") {
      const { $stores } = useNuxtApp();
      this.setLoading(true);
      if (type !== "all") {
        $stores[type].loading = true;
      }

      // fetch the item categories

      const itemsPerPage =
        type === "all" ? 3 : ($stores[type]?.itemsPerPage as number);
      const filters: Record<string, any> = {};

      if (type !== "all") {
        for (const filter in $stores[type].filters) {
          const filterValue = $stores[type].filters[filter]?.value;

          // Prune empty values
          if (typeof filterValue !== "undefined" && filterValue?.length) {
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
            sortBy: type === "all" ? "searchScore" : $stores[type].sortBy,
            sortDesc:
              type === "all" ? -1 : $stores[type].sortDesc > 0 ? true : false,
            // search (if set)
            ...((this.search as string)?.length &&
              type !== "all" && { search: this.search }),
            // add the store module filters
            filters,
          },
          ...((this.search as string)?.length &&
            type === "all" && { search: this.search }),
          appId: "iea",
          lang,
        })
      );
      args.options.filters = JSON.stringify(args.options.filters);
      let result: any = {};
      console.log("args: ", args);

      console.log(`Fetching ${type}`);
      const { $queries } = useNuxtApp();
      const { data, error } = await useAsyncQuery(
        type === "all" ? SEARCH : $queries[type].list,
        args
      );
      /*    console.log("data: ", data) */
      if (error.value) console.log(error.value);
      const key =
        type === "all"
          ? "search"
          : "list" + type.charAt(0).toUpperCase() + type.slice(1);

      if (type === "all") {
        this.results = data?.value?.[key];
      } else {
        const items = data?.value?.[key]?.items ?? [];
        this.total = data?.value?.[key]?.total;
        result = {
          ...data?.value?.[key],
          items: items.map(({ id, ...rest }) => ({
            ...rest,
            _path: `/${id}`,
          })),
        };
        $stores[type].items = result["items"];

        const lastPage = Math.ceil(result.total / itemsPerPage);
        /*         this.updateRouteQuery(type) */
        this.setFiltersCount(type);
        this.setBlankFilterLoad(type);
        /*       console.log("type2: ", type) */
        $stores[type].numberOfPages = lastPage;
      }
      /*     console.log("this.total: ", this.total)
       */
      this.setLoading(false, type);
      return true;
    },
  },
});

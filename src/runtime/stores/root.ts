/* import filtersRaw from '~/assets/data/filters'
import lists from '~/assets/data/lists' */

/* import api from "~/server/api/github" */
import { defineStore } from "pinia";
import type { Views, ModuleType } from "@paris-ias/data";
import SEARCH from "../graphql/queries/list/search.gql";
import { useNuxtApp } from "#imports";

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
    loadRouteQuery(type: string) {
      const { currentRoute } = useRouter();
      const { $stores } = useNuxtApp();
      const query = currentRoute.value.query;
      if (Object.keys(query)?.length) {
        Object.keys(query).forEach((filter) => {
          if (Object.keys($stores[type].filters).includes(filter))
            $stores[type].filters[filter].value = (this[type] as ModuleType)
              .list.filters[filter].multiple
              ? JSON.parse(query[filter] as string)
              : query[filter];
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
    },

    setFiltersCount(type: string) {
      const { $stores } = useNuxtApp();
      let filtersCount = 0 as number;
      Object.keys($stores[type].filters)
        // remove empty values
        .forEach((filter) => {
          /* console.log("filter: ", filter)
          console.log("filters[filter]?.value: ", filters[filter].value)
          */ /*  console.log(
            'typeof filters[filter]?.value !== "undefined": ',
            typeof filters[filter]?.value !== "undefined",
          ) */
          if (
            $stores[type].filters[filter]?.value?.length &&
            typeof $stores[type].filters[filter]?.value !== "undefined"
          ) {
            filtersCount++;
          }
          return filtersCount;
        });

      $stores[type].filtersCount = filtersCount;
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
      // update route
      const routeQuery: Record<string, string> = {
        // Add search if it exists and is defined
        ...(this.search ? { search: this.search } : {}),

        // Add page if it's greater than 1
        ...(this.page > 1 ? { page: this.page.toString() } : {}),

        // Add filters with defined values
        ...Object.entries($stores[type].filters).reduce(
          (acc, [filterKey, filter]) => {
            if (!$stores[type].filters[filterKey]?.value) {
              return acc;
            }
            return {
              ...acc,
              ...{
                [filterKey]: $stores[type].filters[filterKey]?.value,
              },
            };
          },
          {} as Record<string, string>
        ),
      };
      router.replace({ query: routeQuery });
    },
    resetState() {
      const { $stores } = useNuxtApp();
      console.log("resetState");
      this.search = "";
      this.page = 1;
      this.scrolled = false;
      this.loading = false;
      this.total = 0;
      this.skip = 0;
      this.numberOfPages = 0;
      const modules = [
        "events",
        "news",
        "people",
        "projects",
        "fellowships",
        "publications",
      ];
      /*       this.events.list.filters = events.list.filters
      this.news.list.filters = news.list.filters
      this.people.list.filters = people.list.filters
      this.projects.list.filters = projects.list.filters
      this.fellowships.list.filters = fellowships.list.filters
      this.publications.list.filters = publications.list.filters */
      modules.forEach((type) => {
        /*  const viewsObj = $stores[type].views as Record<
          string,
          Views
        >
        const defaultViewsKey = Object.keys(viewsObj).find(
          (item) => viewsObj[item].default === true
        )
        const defaultView = viewsObj[defaultViewsKey as string]

        const sortObj = $stores[type].sort
        const defaultSortKey = Object.keys(sortObj).find(
          (item) => sortObj[item].default === true
        )
        const defaultSort = sortObj[defaultSortKey as string] */
        /*
        // TODO make dynamic based on an ~/assets located file
        ;$stores[type].view = defaultView
        ;$stores[type].sortBy = [defaultSort.value[0]]
        ;$stores[type].sortDesc = [defaultSort.value[1]] */
      });
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

      if (["online", "outside", "past"].includes(key) && val === false) {
        $stores[type].filters[key].value = null;
      } else {
        $stores[type].filters[key].value = val;
      }

      this.updatePage({ page: 1, type });
    },
    updateItemsPerPage({ value, type }: { value: number; type: string }) {
      const { $stores } = useNuxtApp();
      this.page = 1;
      $stores[types].itemsPerPage = value;

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

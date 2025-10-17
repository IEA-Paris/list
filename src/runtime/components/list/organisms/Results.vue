<template>
  <ListMoleculesGlobalSearchInput
    type="all"
    :placeholder="$t('search')"
    variant="outlined"
    :categories="selectedCategories"
    @change="updateSearch($event)"
    @filter-change="handleFilterChange"
  />
  <ListMoleculesResultsContainer
    v-for="type in filteredSortedModules"
    :key="type"
    :feminine="type === 'people'"
    :type
    :open="$rootStore.results[type]?.total > 0 || open[type]"
    @toggle="open[$event] = !open[$event]"
  >
    <v-expand-transition class="results-container">
      <div v-show="open[type]">
        <ListAtomsResultsList :type />
      </div>
    </v-expand-transition>
  </ListMoleculesResultsContainer>
</template>

<script setup>
import {
  useNuxtApp,
  onBeforeUnmount,
  useI18n,
  useAppConfig,
  ref,
  computed,
} from "#imports"
import SEARCH from "@paris-ias/trees/dist/graphql/client/misc/query.search.all.gql"
// Component name for linting
defineOptions({
  name: "SearchResults",
})

const { $rootStore } = useNuxtApp()

const appConfig = useAppConfig()
const { locale } = useI18n()
const open = ref({})

// State for selected categories (default to all selected)
const selectedCategories = ref([...appConfig.list.modules])

// Handle filter changes
const handleFilterChange = (filterData) => {
  selectedCategories.value = filterData.categories
}

// Computed property to sort modules by total count (highest first)
const sortedModules = computed(() => {
  return appConfig.list.modules.slice().sort((a, b) => {
    const aResults = $rootStore.results[a] || { total: 0 }
    const bResults = $rootStore.results[b] || { total: 0 }

    // Sort by highest total count first
    return (bResults.total || 0) - (aResults.total || 0)
  })
})

// Computed property to filter and sort modules based on selected categories
const filteredSortedModules = computed(() => {
  return sortedModules.value.filter((type) =>
    selectedCategories.value.includes(type)
  )
})

// Apollo GraphQL query with proper reactivity
const { data, pending, error, refresh } = await useAsyncQuery(
  SEARCH,
  { search: $rootStore.search, appId: "iea", locale: locale.value },
  {
    key: `search-${$rootStore.search}`, // Unique key for caching
    server: true, // Enable SSR
  }
)
if (error.value) {
  console.error("GraphQL query error: ", error.value)
} else {
  console.log("Query result data: ", data.value.items?.length)
}

// Apply data to store immediately if available
if (data.value) {
  console.log("Applying data to store directly [first load scenario]")
  $rootStore.applyListResult("all", data.value)
}
const updateSearch = async (newSearch) => {
  console.log("update search")
  if (newSearch !== $rootStore.search) {
    await refresh()
    if (data.value) {
      console.log("Applying data to store directly [first load scenario]")
      $rootStore.applyListResult("all", data.value)
    }
  }
}
onBeforeUnmount(() => {
  /* rootStore.resetState("all", locale.value) */
})
</script>
<style scoped>
.results-container {
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>

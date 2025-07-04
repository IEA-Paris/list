<template>
  <ListMoleculesGlobalSearchInput
    type="all"
    :placeholder="$t('search')"
    variant="outlined"
    :categories="selectedCategories"
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
  onMounted,
  useI18n,
  useAppConfig,
  ref,
  computed,
} from "#imports"

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
    selectedCategories.value.includes(type),
  )
})

onMounted(async () => {
  // Initialize the page from the route
  console.log("mounted list")

  try {
    await $rootStore.update("all", locale.value)

    // Set all types to be expanded by default when they have results
    appConfig.list.modules.forEach((type) => {
      if ($rootStore.results[type]?.total > 0) {
        open.value[type] = true
      }
    })
  } catch (error) {
    console.log("error fetching update list: ", error)
  }
})

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

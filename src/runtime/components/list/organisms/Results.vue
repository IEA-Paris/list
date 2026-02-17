<template>
  <ListMoleculesGlobalSearchInput
    type="all"
    :placeholder="$t('search')"
    variant="outlined"
    :categories="selectedCategories"
    @filter-change="handleFilterChange"
  />
  <v-progress-linear v-if="pending" indeterminate />
  <template v-else>
    <ListMoleculesResultsContainer
      v-for="type in filteredSortedModules"
      :key="type"
      :feminine="type === 'people'"
      :type
      :open="$rootStore.results[type]?.total > 0 ?? open[type]"
      @toggle="open[$event] = !open[$event]"
    >
      <v-expand-transition class="results-container">
        <div v-show="$rootStore.results[type]?.total > 0 || open[type]">
          <ListAtomsResultsList :type />
        </div>
      </v-expand-transition>
    </ListMoleculesResultsContainer>
  </template>
</template>

<script setup>
import {
  useNuxtApp,
  useI18n,
  useAppConfig,
  useRoute,
  ref,
  useAsyncQuery,
  computed,
  watch,
} from "#imports"
import SEARCH from "@paris-ias/trees/dist/graphql/client/misc/query.search.all.gql"

defineOptions({ name: "SearchResults" })

const { $rootStore } = useNuxtApp()
const appConfig = useAppConfig()
const { locale } = useI18n()
const route = useRoute()
const open = ref({})

if (route.query.search) {
  $rootStore.search = route.query.search
}

const selectedCategories = ref([...appConfig.list.modules])

const handleFilterChange = (filterData) => {
  selectedCategories.value = filterData.categories
}

const sortedModules = computed(() => {
  return appConfig.list.modules.slice().sort((a, b) => {
    const aMaxScore = Math.max(
      ...($rootStore.results[a]?.items || []).map((i) => i.score ?? 0),
      0,
    )
    const bMaxScore = Math.max(
      ...($rootStore.results[b]?.items || []).map((i) => i.score ?? 0),
      0,
    )
    return bMaxScore - aMaxScore
  })
})
const filteredSortedModules = computed(() => {
  return sortedModules.value.filter((type) =>
    selectedCategories.value.includes(type),
  )
})

const searchTerm = computed(() => $rootStore.search || "")
const currentLocale = computed(() => locale.value)

const { data, pending, error } = useAsyncQuery(
  SEARCH,
  computed(() => ({
    search: searchTerm.value,
    appId: "iea",
    locale: currentLocale.value,
  })),
  {
    enabled: computed(() => searchTerm.value.length > 0),
  },
)
if (error.value) {
  console.error("GraphQL query error: ", error.value)
} else {
  /*  console.log("Query result data: ", data.value.items?.length) */
}

watch(
  data,
  (newData) => {
    if (newData) {
      console.log("Applying search data to store")
      $rootStore.applyListResult("all", newData)
      appConfig.list.modules.forEach((type) => {
        if ($rootStore.results[type]?.total > 0) {
          open.value[type] = true
        }
      })
    }
  },
  { immediate: true },
)

watch(error, (err) => {
  if (err) console.error("GraphQL query error:", err)
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

<template>
  <ListMoleculesGlobalSearchInput
    type="all"
    :placeholder="$t('search')"
    :categories="selectedCategories"
    filter
    @filter-change="handleFilterChange"
    class="mb-6"
  />
  <div v-if="searchTerm.length === 0" class="search-empty">
    <ListAtomsLogoPlaceholder idle />
  </div>
  <template v-else>
    <div v-if="loading" class="search-pending">
      <ListAtomsLogoPlaceholder />
    </div>
    <template v-else-if="!loading">
      <ListMoleculesResultsContainer
        v-for="type in filteredSortedModules"
        :key="type"
        :feminine="
          type === 'people' || type === 'news' || type === 'publications'
        "
        :type
        :open="open[type] ?? false"
        @toggle="(t) => (open[t] = !open[t])"
      >
        <v-expand-transition class="results-container">
          <div v-show="open[type]">
            <ListAtomsResultsList
              :type
              :pathPrefix="
                type === 'people'
                  ? 'people-slug'
                  : 'activities-' + type + '-slug'
              "
            />
          </div>
        </v-expand-transition>
      </ListMoleculesResultsContainer>
    </template>
  </template>
</template>

<script setup>
import {
  useNuxtApp,
  useI18n,
  useAppConfig,
  useRoute,
  ref,
  reactive,
  useAsyncQuery,
  computed,
  watch,
} from "#imports"
import SEARCH from "@paris-ias/trees/dist/graphql/client/misc/query.search.all.gql"

const { $rootStore } = useNuxtApp()
const appConfig = useAppConfig()
const { locale } = useI18n()
const route = useRoute()
if (route.query.search) {
  $rootStore.search = route.query.search
}

const loading = ref(true)

const open = reactive(
  appConfig.list.modules.reduce((acc, type) => {
    acc[type] = false
    return acc
  }, {}),
)

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
    lang: currentLocale.value,
  })),
  {
    server: false,
    enabled: computed(() => searchTerm.value.length > 0),
  },
)
if (error.value) {
  console.error("GraphQL query error: ", error.value)
} else {
  /*  console.log("Query result data: ", data.value.items?.length) */
}

const applyData = (newData) => {
  if (!newData) return
  $rootStore.applyListResult("all", newData)
  appConfig.list.modules.forEach((type) => {
    if (newData.search?.[type]?.total > 0) {
      open[type] = true
    }
  })
  loading.value = false
}

watch(data, applyData, { immediate: true })

watch(error, (err) => {
  if (err) {
    console.error("GraphQL query error:", err)
    loading.value = false
  }
})
</script>
<style scoped>
.results-container {
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.search-empty {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  opacity: 0.8;
}

.search-pending {
  display: flex;
  justify-content: center;
  padding: 48px 0;
}
</style>

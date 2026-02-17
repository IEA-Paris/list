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
    :open="$rootStore.results[type]?.total > 0 ?? open[type]"
    @toggle="open[$event] = !open[$event]"
  >
    {{ $rootStore.results[type]?.total }}
    <v-expand-transition class="results-container">
      <div v-show="$rootStore.results[type]?.total > 0 || open[type]">
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
  useAsyncQuery,
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
    selectedCategories.value.includes(type),
  )
})

// Apollo GraphQL query with proper reactivity
const { data, pending, error, refresh } = await useAsyncQuery(
  SEARCH,
  { search: $rootStore.search, appId: "iea", locale: locale.value },
  {
    key: `search-${$rootStore.search}`, // Unique key for caching
    server: true, // Enable SSR
  },
)
if (error.value) {
  console.error("GraphQL query error: ", error.value)
} else {
  /*  console.log("Query result data: ", data.value.items?.length) */
}

// Apply data to store immediately if available
if (data.value) {
  console.log("Applying data to store directly [first load scenario]")
  $rootStore.applyListResult("all", data.value)
  // Initialize open state for types with results
  appConfig.list.modules.forEach((type) => {
    if ($rootStore.results[type]?.total > 0) {
      open.value[type] = true
    }
  })
}

const updateSearch = async (newSearch) => {
  console.log("update search")
  if (newSearch !== $rootStore.search) {
    await refresh()
    if (data.value) {
      console.log("Applying data to store directly [first load scenario]")
      $rootStore.applyListResult("all", data.value)
      // Initialize open state for types with results
      appConfig.list.modules.forEach((type) => {
        if ($rootStore.results[type]?.total > 0) {
          open.value[type] = true
        }
      })
    }
  }
}
onBeforeUnmount(() => {
  /* rootStore.resetState("all", locale.value) */
})

const socioscope = {
  appId: ["iea"],
  url: "https://thesocioscope.org",
  subtitle: {
    en: "Seeing How Social Change Takes Shape",
    fr: "Voir comment le changement social prend forme",
  },
  date: {
    $date: "2023-03-18T00:00:00.000Z",
  },
  image: {
    url: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/project/the_socioscope.svg",
  },
  summary: {
    en: "Through large scale data collection around the world and LLM-driven research, the Socioscope analyses how behaviours, norms, and practices evolve within sustainable food transitions.\nWe're building a systemic way to help make complex social patterns measurable, comparable, and understandable.",
    fr: "Grâce à la collecte de données à grande échelle dans le monde entier et à la recherche pilotée par LLM, le Socioscope analyse comment les comportements, normes et pratiques évoluent dans les transitions alimentaires durables.\nNous construisons une méthode systématique pour rendre les schémas sociaux complexes mesurables, comparables et compréhensibles.",
  },
  description: {
    en: "The Socioscope is a transformative qualitative research project that maps how behaviours, norms, and communities influence the transition toward sustainable food systems.\nThe Socioscope serves as a comprehensive observatory of these efforts, making knowledge accessible to researchers, policymakers, and practitioners worldwide. Equally important is shining a light on local initiatives that lead change on the ground and drive the shift toward a more sustainable food system.",
    fr: "Le Socioscope est un projet de recherche qualitative transformatif qui cartographie comment les comportements, normes et communautés influencent la transition vers des systèmes alimentaires durables.\nLe Socioscope sert d'observatoire complet de ces efforts, rendant les connaissances accessibles aux chercheurs, décideurs politiques et praticiens du monde entier. Tout aussi important, il met en lumière les initiatives locales qui mènent le changement sur le terrain et conduisent la transition vers un système alimentaire plus durable.",
  },
  name: {
    en: "The Socioscope",
    fr: "Le Socioscope",
  },
  related: {
    people: [
      {
        firstname: "Antoine",
        lastname: "Cordelois",
        image: {
          url: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/people/antoine_cordelois.jpg",
        },
      },
      {
        firstname: "Saadi",
        lastname: "Lahlou",
        image: {
          url: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/people/lahlou_saadi.jpg",
        },
      },
      {
        firstname: "Paulius",
        lastname: "Yamin",
        image: {
          url: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/people/Paulius_Yamin.jpg",
        },
      },
    ],
  },
  slug: {
    fr: "le-socioscope",
    en: "the-socioscope",
  },
}
</script>
<style scoped>
.results-container {
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>

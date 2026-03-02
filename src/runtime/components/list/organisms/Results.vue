<template>
  <ListMoleculesGlobalSearchInput
    type="all"
    :placeholder="$t('search')"
    :categories="selectedCategories"
    :filter-order="sortedModules"
    filter
    @filter-change="handleFilterChange"
    class="mb-6"
  />
  <div v-if="searchTerm.length === 0" class="search-empty">
    <ListAtomsLogoPlaceholder idle />
  </div>
  <template v-else>
    <div v-if="pending" class="search-pending">
      <div class="search-pending__inner">
        <ListAtomsLogoPlaceholder class="loader-logo loader-logo--active" />
        <div class="search-pending__dots">
          <span class="search-pending__dot" />
          <span class="search-pending__dot" />
          <span class="search-pending__dot" />
        </div>
      </div>
    </div>
    <template v-else>
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

const open = reactive(
  appConfig.list.modules.reduce((acc, type) => {
    acc[type] = false
    return acc
  }, {}),
)

const selectedCategories = reactive([...appConfig.list.modules])

const handleFilterChange = (filterData) => {
  selectedCategories.splice(
    0,
    selectedCategories.length,
    ...filterData.categories,
  )
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
  return sortedModules.value.filter((type) => selectedCategories.includes(type))
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

watch(data, (newData) => {
  if (!newData) return
  $rootStore.applyListResult("all", newData)
  appConfig.list.modules.forEach((type) => {
    if (newData.search?.[type]?.total > 0) {
      open[type] = true
    }
  })
})

watch(error, (err) => {
  if (err) console.error("GraphQL query error:", err)
})
</script>

<style scoped lang="scss">
$animation-duration: 3141ms;
$animation-easing: ease;

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
  svg {
    width: min(32vh, 32vw);
    height: min(32vh, 32vw);
  }
}

.search-pending {
  display: flex;
  justify-content: center;
  padding: 48px 0;
  svg {
    width: min(32vh, 32vw);
    height: min(32vh, 32vw);
  }
}

.search-pending__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.loader-logo {
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
  width: 200px;
  height: auto;
}

/* Drawing animation — mirrors ListOrganismsLoader exactly */
.loader-logo--active :deep([class^="IEA_"]) {
  fill: transparent;
  stroke: #000;
  stroke-opacity: 1;
  fill-opacity: 1;
  fill-rule: nonzero;
}

.loader-logo--active :deep(.IEA_0) {
  stroke-dasharray: 1223 1225;
  stroke-dashoffset: 1224;
  animation: IEA_draw_0 $animation-duration $animation-easing 0ms infinite;
}
.loader-logo--active :deep(.IEA_5) {
  stroke-dasharray: 335 337;
  stroke-dashoffset: 336;
  animation: IEA_draw_5 $animation-duration $animation-easing 0ms infinite;
}
.loader-logo--active :deep(.IEA_1) {
  stroke-dasharray: 1351 1353;
  stroke-dashoffset: 1352;
  animation:
    IEA_draw_1 $animation-duration $animation-easing 0ms infinite,
    stroke-fade $animation-duration linear 0ms infinite,
    fill-standard $animation-duration $animation-easing 0ms infinite;
}
.loader-logo--active :deep(.IEA_2) {
  stroke-dasharray: 1311 1313;
  stroke-dashoffset: 1312;
  animation:
    IEA_draw_2 $animation-duration $animation-easing 0ms infinite,
    stroke-fade $animation-duration linear 0ms infinite,
    fill-standard $animation-duration $animation-easing 0ms infinite;
}
.loader-logo--active :deep(.IEA_3),
.loader-logo--active :deep(.IEA_4) {
  stroke-dasharray: 13 15;
  stroke-dashoffset: 14;
}
.loader-logo--active :deep(.IEA_3) {
  animation:
    IEA_draw_3 $animation-duration $animation-easing 0ms infinite,
    stroke-fade $animation-duration linear 0ms infinite,
    fill-standard $animation-duration $animation-easing 0ms infinite;
}
.loader-logo--active :deep(.IEA_4) {
  animation:
    IEA_draw_4 $animation-duration $animation-easing 0ms infinite,
    stroke-fade $animation-duration linear 0ms infinite,
    fill-standard $animation-duration $animation-easing 0ms infinite;
}
.loader-logo--active :deep(.IEA_6),
.loader-logo--active :deep(.IEA_7),
.loader-logo--active :deep(.IEA_8) {
  stroke-dasharray: 102 104;
  stroke-dashoffset: 103;
}
.loader-logo--active :deep(.IEA_6) {
  animation:
    IEA_draw_6 $animation-duration $animation-easing 0ms infinite,
    stroke-fade $animation-duration linear 0ms infinite,
    fill-standard $animation-duration $animation-easing 0ms infinite;
}
.loader-logo--active :deep(.IEA_7) {
  animation:
    IEA_draw_7 $animation-duration $animation-easing 0ms infinite,
    stroke-fade $animation-duration linear 0ms infinite,
    fill-standard $animation-duration $animation-easing 0ms infinite;
}
.loader-logo--active :deep(.IEA_8) {
  animation:
    IEA_draw_8 $animation-duration $animation-easing 0ms infinite,
    stroke-fade $animation-duration linear 0ms infinite,
    fill-standard $animation-duration $animation-easing 0ms infinite;
}
.loader-logo--active :deep(.IEA_9) {
  stroke-dasharray: 372 374;
  stroke-dashoffset: 373;
  animation:
    IEA_draw_9 $animation-duration $animation-easing 0ms infinite,
    stroke-fade $animation-duration linear 0ms infinite,
    fill-standard $animation-duration $animation-easing 0ms infinite;
}
.loader-logo--active :deep(.IEA_10) {
  stroke-dasharray: 96 98;
  stroke-dashoffset: 97;
  animation:
    IEA_draw_10 $animation-duration $animation-easing 0ms infinite,
    stroke-fade $animation-duration linear 0ms infinite,
    fill-standard $animation-duration $animation-easing 0ms infinite;
}
.loader-logo--active :deep(.IEA_11) {
  stroke-dasharray: 184 186;
  stroke-dashoffset: 185;
  animation:
    IEA_draw_11 $animation-duration $animation-easing 0ms infinite,
    stroke-fade $animation-duration linear 0ms infinite,
    fill-standard $animation-duration $animation-easing 0ms infinite;
}
.loader-logo--active :deep(.IEA_12) {
  stroke-dasharray: 169 171;
  stroke-dashoffset: 170;
  animation:
    IEA_draw_12 $animation-duration $animation-easing 0ms infinite,
    stroke-fade $animation-duration linear 0ms infinite,
    fill-standard $animation-duration $animation-easing 0ms infinite;
}
.loader-logo--active :deep(.IEA_13) {
  stroke-dasharray: 1020 1022;
  stroke-dashoffset: 1021;
  animation:
    IEA_draw_13 $animation-duration $animation-easing 0ms infinite,
    stroke-fade $animation-duration linear 0ms infinite,
    fill-circles $animation-duration $animation-easing 0ms infinite;
}
.loader-logo--active :deep(.IEA_14) {
  stroke-dasharray: 939 941;
  stroke-dashoffset: 940;
  animation:
    IEA_draw_14 $animation-duration $animation-easing 0ms infinite,
    stroke-fade $animation-duration linear 0ms infinite,
    fill-circles $animation-duration $animation-easing 0ms infinite;
}
.loader-logo--active :deep(.IEA_15) {
  stroke-dasharray: 326 328;
  stroke-dashoffset: 327;
  animation:
    IEA_draw_15 $animation-duration $animation-easing 0ms infinite,
    stroke-fade $animation-duration linear 0ms infinite,
    fill-standard $animation-duration $animation-easing 0ms infinite;
}

@keyframes fill-standard {
  0%,
  35% {
    fill: transparent;
  }
  60% {
    fill: rgba(0, 0, 0, 0.3);
  }
  80% {
    fill: rgba(0, 0, 0, 0.7);
  }
  100% {
    fill: #000;
  }
}

@keyframes fill-circles {
  0%,
  35% {
    fill: transparent;
  }
  60% {
    fill: rgba(0, 0, 0, 0.2);
  }
  80% {
    fill: rgba(0, 0, 0, 0.5);
  }
  100% {
    fill: #000;
  }
}

@keyframes stroke-fade {
  0%,
  65% {
    stroke-opacity: 1;
  }
  80% {
    stroke-opacity: 0.5;
  }
  95% {
    stroke-opacity: 0.2;
  }
  100% {
    stroke-opacity: 0;
  }
}

@keyframes IEA_draw_0 {
  5% {
    stroke-dashoffset: 1224;
  }
  30%,
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes IEA_draw_1 {
  8% {
    stroke-dashoffset: 1352;
  }
  35%,
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes IEA_draw_2 {
  10% {
    stroke-dashoffset: 1312;
  }
  40%,
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes IEA_draw_3 {
  12% {
    stroke-dashoffset: 14;
  }
  45%,
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes IEA_draw_4 {
  15% {
    stroke-dashoffset: 14;
  }
  50%,
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes IEA_draw_5 {
  15.74% {
    stroke-dashoffset: 336;
  }
  43.52%,
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes IEA_draw_6 {
  16.67% {
    stroke-dashoffset: 103;
  }
  44.44%,
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes IEA_draw_7 {
  17.59% {
    stroke-dashoffset: 103;
  }
  45.37%,
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes IEA_draw_8 {
  18.52% {
    stroke-dashoffset: 103;
  }
  46.3%,
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes IEA_draw_9 {
  19.44% {
    stroke-dashoffset: 373;
  }
  47.22%,
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes IEA_draw_10 {
  20.37% {
    stroke-dashoffset: 97;
  }
  48.15%,
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes IEA_draw_11 {
  21.3% {
    stroke-dashoffset: 185;
  }
  49.07%,
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes IEA_draw_12 {
  22.22% {
    stroke-dashoffset: 170;
  }
  50%,
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes IEA_draw_13 {
  23.15% {
    stroke-dashoffset: 1021;
  }
  50.93%,
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes IEA_draw_14 {
  24.07% {
    stroke-dashoffset: 940;
  }
  51.85%,
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes IEA_draw_15 {
  25% {
    stroke-dashoffset: 327;
  }
  52.78%,
  100% {
    stroke-dashoffset: 0;
  }
}

/* Minimalist three-dot indicator */
.search-pending__dots {
  display: flex;
  gap: 6px;
  align-items: center;
}

.search-pending__dot {
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #000;
  animation: dot-bounce 1.2s ease-in-out infinite;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
}

@keyframes dot-bounce {
  0%,
  80%,
  100% {
    opacity: 0.15;
    transform: translateY(0);
  }
  40% {
    opacity: 0.7;
    transform: translateY(-4px);
  }
}
</style>

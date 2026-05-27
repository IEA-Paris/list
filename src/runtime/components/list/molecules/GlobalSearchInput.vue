<template>
  <div class="d-flex align-center">
    <v-menu
      v-if="filter && mdAndUp"
      v-model="filterMenuOpen"
      :close-on-content-click="false"
      location="bottom end"
      offset="4"
    >
      <template #activator="{ props: menuProps }">
        <v-btn
          v-bind="menuProps"
          :rounded="0"
          variant="outlined"
          size="large"
          height="56"
        >
          <v-icon>mdi-filter</v-icon>
          <span
            v-if="hasActiveFilter"
            class="ml-1 global-search__filter-count"
            >{{ categories.length }}</span
          >
          <v-icon class="ml-1" size="small">
            {{ filterMenuOpen ? "mdi-chevron-up" : "mdi-chevron-down" }}
          </v-icon>
          <v-tooltip activator="parent" location="start">
            {{ $t("filter-by-type") }}
          </v-tooltip>
        </v-btn>
      </template>

      <v-card min-width="220">
        <div class="d-flex justify-space-between align-center px-3 py-1">
          <v-btn
            size="x-small"
            variant="text"
            :disabled="allSelected"
            @click="selectAllFilters"
          >
            {{ $t("filter.select-all") }}
          </v-btn>
          <v-btn
            size="x-small"
            variant="text"
            :disabled="noneSelected"
            @click="clearFilters"
          >
            {{ $t("filter.select-none") }}
          </v-btn>
        </div>
        <v-divider />
        <v-list density="compact">
          <v-list-item
            v-for="option in filterOptions"
            :key="option.value"
            @click="toggleFilter(option)"
          >
            <template #prepend>
              <v-checkbox
                hide-details
                :model-value="categories.includes(option.value)"
                @update:model-value="toggleFilter(option)"
              />
            </template>
            <v-list-item-title>{{ option.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <v-text-field
      ref="textFieldRef"
      :id="`global-search-input-${type}`"
      v-model.trim="search"
      :placeholder="placeholderText"
      single-line
      class="transition-swing flex-grow-1"
      variant="outlined"
      hide-details
      clearable
      tile
      type="search"
      :loading="rootStore.loading"
      @keyup.enter="navigateToSearch"
      @click:append="navigateToSearch"
    >
      <template v-if="!search" #label>
        <div class="searchLabel">
          {{ placeholderText }}
        </div>
      </template>
    </v-text-field>
    <v-btn
      :rounded="0"
      variant="outlined"
      size="large"
      height="56"
      @keyup.enter="navigateToSearch"
      @click="navigateToSearch"
    >
      <v-icon size="large">mdi-magnify</v-icon>
      <v-tooltip activator="parent" location="start">{{
        $t("click-here-to-search")
      }}</v-tooltip>
    </v-btn>
  </div>
</template>

<script setup>
import { useDebounceFn } from "@vueuse/core"
import { useRootStore } from "../../../stores/root"
import { useDisplay } from "vuetify"
import {
  computed,
  useI18n,
  ref,
  useLocalePath,
  useRoute,
  useRouter,
  navigateTo,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "#imports"
const { mdAndUp } = useDisplay()
const localePath = useLocalePath()
const { locale, t } = useI18n()
const rootStore = useRootStore()
const route = useRoute()
const routeName = computed(() => route.name?.toString() ?? "")
// Utility function to capitalize first letter
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
const emit = defineEmits(["filter-change"])

// Rotating placeholder examples (only used for the global "all" search).
// Examples live in i18n; keys may be absent in some locales — we filter those.
const EXAMPLE_COUNT = 4
const ROTATE_MS = 3000
const exampleIndex = ref(0)
const exampleKeys = computed(() => {
  const keys = []
  for (let i = 1; i <= EXAMPLE_COUNT; i++) keys.push(`search.example.${i}`)
  return keys
})
const exampleTexts = computed(() =>
  exampleKeys.value
    .map((k) => t(k))
    .filter((s) => s && !s.startsWith("search.example.")),
)

let rotateTimer = null
const startRotation = () => {
  if (rotateTimer || exampleTexts.value.length <= 1) return
  if (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  )
    return
  rotateTimer = setInterval(() => {
    exampleIndex.value = (exampleIndex.value + 1) % exampleTexts.value.length
  }, ROTATE_MS)
}
const stopRotation = () => {
  if (rotateTimer) clearInterval(rotateTimer)
  rotateTimer = null
}
onMounted(startRotation)
onBeforeUnmount(stopRotation)

const placeholderText = computed(() => {
  // On the dedicated /search page we want a more explicit instruction.
  if (routeName.value.startsWith("search")) {
    return mdAndUp.value
      ? t("type-a-search-term-to-find-results-across-all-categories")
      : t("search")
  }
  // Per-type search inputs keep their existing scoped placeholder.
  if (props.type !== "all") {
    return t("list.search-type", [t("items." + props.type, 2)])
  }
  // Global search: rotate through example queries to teach what's searchable.
  const examples = exampleTexts.value
  if (examples.length === 0) return t("search")
  return t("search.try", [examples[exampleIndex.value % examples.length]])
})
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  categories: {
    type: Array,
    default: () => [],
  },
  filter: {
    type: Boolean,
    default: false,
  },
  filterOrder: {
    type: Array,
    default: () => [],
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
})

onMounted(() => {
  if (!props.autofocus) return
  // Wait one tick so the v-text-field has rendered before reaching into it.
  nextTick(() => {
    const input = textFieldRef.value?.$el?.querySelector?.("input")
    input?.focus()
  })
})

// Filter dropdown state
const filterMenuOpen = ref(false)

// Filter options
const allFilterOptions = computed(() => ({
  people: { value: "people", label: capitalize(t("items.people", 2)) },
  events: { value: "events", label: capitalize(t("items.events", 2)) },
  news: { value: "news", label: capitalize(t("items.news", 2)) },
  publications: {
    value: "publications",
    label: capitalize(t("items.publications", 2)),
  },
  fellowships: {
    value: "fellowships",
    label: capitalize(t("items.fellowships", 2)),
  },
  projects: { value: "projects", label: capitalize(t("items.projects", 2)) },
}))

const filterOptions = computed(() => {
  const map = allFilterOptions.value
  if (props.filterOrder.length > 0) {
    const ordered = props.filterOrder.filter((k) => map[k]).map((k) => map[k])
    const rest = Object.values(map).filter(
      (o) => !props.filterOrder.includes(o.value),
    )
    return [...ordered, ...rest]
  }
  return Object.values(map)
})

const allValues = computed(() => filterOptions.value.map((o) => o.value))

const allSelected = computed(
  () =>
    props.categories.length === allValues.value.length &&
    allValues.value.every((v) => props.categories.includes(v)),
)
const noneSelected = computed(() => props.categories.length === 0)
// Show the count badge only when the user has narrowed the selection.
const hasActiveFilter = computed(
  () => !allSelected.value && !noneSelected.value,
)

const selectAllFilters = () => {
  emit("filter-change", {
    name: "__all__",
    value: true,
    categories: [...allValues.value],
  })
}

const clearFilters = () => {
  emit("filter-change", {
    name: "__none__",
    value: false,
    categories: [],
  })
}

// Toggle filter selection
const toggleFilter = (option) => {
  const currentCategories = [...props.categories]
  const index = currentCategories.indexOf(option.value)

  if (index > -1) {
    currentCategories.splice(index, 1)
  } else {
    currentCategories.push(option.value)
  }

  emit("filter-change", {
    name: option.value,
    value: currentCategories.includes(option.value),
    categories: currentCategories,
  })
}

const textFieldRef = ref(null)

const navigateToSearch = () => {
  const term = (
    textFieldRef.value?.$el?.querySelector("input")?.value ??
    rootStore.search ??
    ""
  ).trim()
  rootStore.search = term
  navigateTo({
    path: localePath("/search"),
    query: term ? { search: term } : {},
  })
}

const search = computed({
  get() {
    return rootStore.search
  },
  // 600ms matches a comfortable typing rhythm and is long enough that the
  // GraphQL query doesn't fire mid-word. Passing writeUrl:false keeps the
  // URL stable during typing — the URL is committed by navigateToSearch on
  // submit (Enter / magnifier).
  set: useDebounceFn(function (v) {
    const value = v || ""
    if (!value && !rootStore.search) return

    rootStore.updateSearch({
      type: props.type,
      search: value,
      lang: locale.value,
      writeUrl: false,
    })
  }, 600),
})
</script>

<style lang="scss" scoped>
.global-search__filter-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background: #000;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 600;
  line-height: 1;
}
</style>

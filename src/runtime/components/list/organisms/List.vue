<template>
  <ListMoleculesHeader :type="type" />
  <component
    :is="view"
    :loading="$stores[type] && $stores[type].loading && pending"
  >
    <component
      :is="itemTemplate"
      v-for="(item, index) in items"
      :key="(item.name || item.lastname) + type + index"
      :item
      :index
      :loading="$stores[type] && $stores[type].loading && pending"
      :pathPrefix="
        localePath({ name: pathPrefix, params: { slug: item.slug } })
      "
    />
  </component>
  <div class="text-center">
    <ListAtomsPerPage :type="type" class="float-right" />

    <ListMoleculesPagination
      v-if="$stores[type].numberOfPages > 1"
      :type
      large
      :current-page="$stores[type].page"
      :total-pages="$stores[type].numberOfPages"
      :page-padding="1"
      :page-gap="2"
      :hide-prev-next="false"
      @update="onPageChange"
    />
  </div>
</template>

<script setup>
import { useRootStore } from "../../../stores/root"
import { capitalize } from "../../../composables/useUtils"
import {
  useNuxtApp,
  resolveComponent,
  computed,
  onUpdated,
  onMounted,
  watch,
  onBeforeUnmount,
  nextTick,
  useI18n,
  useRoute,
  useLocalePath,
  useAsyncQuery,
} from "#imports"

const { $stores, $queries } = useNuxtApp()
const { locale } = useI18n()
const route = useRoute()
const rootStore = useRootStore()
const localePath = useLocalePath()

const props = defineProps({
  addBtn: {
    type: Boolean,
    required: false,
    default: false,
  },
  type: {
    type: String,
    default: "people",
    required: true,
  },
  /*   layout: {
    type: Object,
    required: false,
    default: () => {
      return {
        cols: 12,
        xl: 12,
      }
    },
  }, */
  pathPrefix: {
    type: String,
    required: true,
  },

  addButton: {
    type: Boolean,
    required: false,
    default: false,
  },
})

// Initialize loading state
console.log("start llocal loading from setup")
rootStore.setLoading(true, props.type)

// Initial route -> store (single source-of-truth on first load)
rootStore.loadRouteQuery(props.type)

// Computed properties for dynamic components
const view = computed(() =>
  props.customView
    ? resolveComponent("ListViews" + capitalize(props.customView))
    : resolveComponent(
        "ListViews" + capitalize($stores[props.type]?.view?.name || "list"),
      ),
)
const itemTemplate = computed(() =>
  resolveComponent(
    (
      capitalize(props.type) +
      capitalize($stores[props.type]?.view?.name || "list") +
      "Item"
    ).toString(),
  ),
)

// Apollo: reactive query using variables computed from store
const variables = computed(() => {
  console.log("computed variables loop")
  return rootStore.buildListVariables(props.type, locale.value)
})
console.log("Starting query for type: ", props.type)
console.log("Using variables: ", variables.value)

// Apollo GraphQL query with proper reactivity
const { data, pending, error, refresh } = await useAsyncQuery(
  $queries[props.type]?.list,
  variables, // Pass the reactive computed, not its value
  {
    key: `list-${props.type}`, // Unique key for caching
    server: true, // Enable SSR
  },
)
if (error.value) {
  console.error("GraphQL query error: ", error.value)
} else {
  console.log("Query result data: ", data.value.items?.length)
}

// Apply data to store immediately if available
if (data.value) {
  console.log("Applying data to store directly [first load scenario]")
  rootStore.applyListResult(props.type, data.value)
}

// Watch for variable changes to refresh and apply new data
watch(
  variables,
  async (newVars, oldVars) => {
    if (newVars && JSON.stringify(newVars) !== JSON.stringify(oldVars)) {
      console.log("Variables changed, refreshing query, newVars: ", newVars)
      console.log("start local loading from computed")
      rootStore.setLoading(true, props.type)
      await refresh()
      if (data.value) {
        console.log("Applying refreshed data to store")
        rootStore.applyListResult(props.type, data.value)
      }
      rootStore.setLoading(false, props.type)
    }
  },
  { deep: true },
)

// Reactive items computed from the store (single source of truth)
const items = computed(() => $stores[props.type]?.items || [])

onMounted(() => {
  // On initial mount: clear loading state
  console.log("STOP local loading from mounted")
  rootStore.setLoading(false, props.type)
})

onBeforeUnmount(() => {
  rootStore.resetState(props.type, locale.value)
})
async function onPageChange(newPage) {
  console.log("onPageChange: ", newPage)

  // Set loading state first
  rootStore.setLoading(true, props.type)

  // Update the page in the store
  rootStore.updatePage({
    page: newPage,
    type: props.type,
    lang: locale.value,
  })

  // Wait for the next tick to ensure DOM updates
  await nextTick()

  // Use setTimeout to ensure the scroll happens after route transition completes
  setTimeout(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, 0)
}
/*
onUpdated(() => {
  console.log("STOP local loading from updated")
  rootStore.setLoading(false, props.type)
}) */
</script>

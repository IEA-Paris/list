<template>
  <ListMoleculesHeader :type="type" />
  <component :is="view" :loading="$stores[type] && $stores[type].loading">
    <component
      :is="itemTemplate"
      v-for="(item, index) in displayItems"
      :key="index"
      :item="item"
      :index="index"
      :loading="$stores[type] && $stores[type].loading"
      :pathPrefix="resolveItemPath(item)"
    />
  </component>
  <div class="text-center">
    <ListAtomsPerPage
      v-if="numberOfPages > 1"
      :type="type"
      class="float-right"
    />

    <ListMoleculesPagination
      v-if="numberOfPages > 1"
      :type="type"
      color="black"
      large
      :current-page="page"
      :total-pages="numberOfPages"
      :page-padding="1"
      :page-gap="2"
      :hide-prev-next="false"
      @update="onPageChange"
    />
  </div>
</template>

<script setup>
import {
  computed,
  ref,
  unref,
  onUpdated,
  onMounted,
  nextTick,
  watch,
} from "vue"
import { useRootStore } from "../../../stores/root"
import { capitalize } from "../../../composables/useUtils"
import {
  useNuxtApp,
  resolveComponent,
  onBeforeUnmount,
  useI18n,
  useRoute,
  useLocalePath,
  useAsyncQuery,
} from "#imports"
// Removed incorrect default import of useAsyncQuery from @nuxtjs/apollo
const { $stores } = useNuxtApp()
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
  layout: {
    type: Object,
    required: false,
    default: () => {
      return {
        cols: 12,
        xl: 12,
      }
    },
  },
  pathPrefix: {
    type: String,
    required: true,
  },
  pagination: {
    type: Object,
    required: false,
    default: () => {
      return {}
    },
  },
  addButton: {
    type: Boolean,
    required: false,
    default: false,
  },
  items: [Object],
})

const view = computed(() =>
  props.customView
    ? resolveComponent("ListViews" + capitalize(props.customView))
    : resolveComponent("ListViews" + capitalize($stores[props.type].view.name)),
)
const itemTemplate = computed(() =>
  resolveComponent(
    (
      capitalize(props.type) +
      capitalize($stores[props.type].view.name) +
      "Item"
    ).toString(),
  ),
)
// Initial route -> store (single source-of-truth on first load)
rootStore.loadRouteQuery(props.type)
const initialPage = Number.parseInt(route.query.page, 10)
if (!Number.isNaN(initialPage) && initialPage > 1) rootStore.page = initialPage

// Items and pagination will be derived from the Apollo result
const page = computed(() => rootStore.page)
let listItems = computed(() => [])
let displayItems = computed(() => [])
let numberOfPages = computed(() => 0)
console.log("setup list")

// Loading strategy:
// - Global loader for initial mount and on route.path changes
// - Skeleton (module-only) loader for in-list refreshes (variables changes)
const isInitial = ref(true)
// Defer initial loader changes to client mount to avoid hydration issues
onMounted(async () => {
  // 1) Show global loader first
  rootStore.setLoading(true)
  if ($stores[props.type]) $stores[props.type].loading = false

  // 2) After first paint, switch to local skeleton and hide global
  await nextTick()
  if ($stores[props.type]) $stores[props.type].loading = true
  rootStore.setLoading(false)
  isInitial.value = false
})

onBeforeUnmount(() => {
  rootStore.resetState(props.type, locale.value)
})

async function onPageChange(newPage) {
  console.log("OnPageChange")
  await rootStore.updatePage({
    page: newPage,
    type: props.type,
    lang: locale.value,
  })
  if (typeof window !== "undefined") {
    console.log("Scolling top")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
}

console.log("pathPrefix", itemTemplate.value)

// Apollo: reactive query using variables computed from store
const { $queries } = useNuxtApp()

const variables = computed(() =>
  rootStore.buildListVariables(props.type, locale.value),
)

const rawDoc = unref($queries[props.type]?.list)
const documentNode = typeof rawDoc === "function" ? rawDoc() : rawDoc
const queryState = documentNode
  ? useAsyncQuery(documentNode, variables, { fetchPolicy: "network-only" })
  : { data: ref(null), pending: ref(false), error: ref(null) }
const { data, pending, error } = queryState

// Key of the list result in the GraphQL response
const resultKey = computed(
  () => "list" + props.type.charAt(0).toUpperCase() + props.type.slice(1),
)

const listReady = computed(() =>
  Boolean(data.value && data.value[resultKey.value]),
)

onUpdated(() => {
  if (!isInitial.value && $stores[props.type]) {
    $stores[props.type].loading = !!pending.value
  }
})
// Derive items and pagination directly from the query result

listItems = computed(() => {
  const list = data.value?.[resultKey.value]
  const arr = Array.isArray(list?.items) ? list.items : []
  return arr.map((it) => {
    if (it && typeof it === "object" && "id" in it) {
      const { id, ...rest } = it
      return { ...rest, _path: `/${id}` }
    }
    return it
  })
})

numberOfPages = computed(() => {
  const list = data.value?.[resultKey.value]
  const total = Number(list?.total || 0)
  const perPage = Number(variables.value?.options?.limit || 10)
  return total > 0 && perPage > 0 ? Math.ceil(total / perPage) : 0
})

// Items to render in the view: real items if available, otherwise placeholders
displayItems = computed(() => {
  const items = listItems.value
  if (Array.isArray(items) && items.length) return items
  if ($stores[props.type]?.loading) {
    const count = Number($stores[props.type]?.itemsPerPage || 8)
    return Array.from({ length: count }, () => ({ slug: "" }))
  }
  return []
})

// Keep module store's total and numberOfPages in sync with results
const total = computed(() => {
  const list = data.value?.[resultKey.value]
  return Number(list?.total || 0)
})

watch(
  total,
  (t) => {
    const st = $stores[props.type]
    if (st) {
      st.total = Number.isFinite(t) ? t : 0
      st.numberOfPages = numberOfPages.value
    }
  },
  { immediate: true },
)

if (process.dev) {
  if (error.value) console.error("List query error:", error.value)
}

function resolveItemPath(item) {
  try {
    const slug = item && item.slug
    if (slug) {
      return localePath({ name: props.pathPrefix, params: { slug } })
    }
  } catch (_) {}
  return route.path
}
</script>

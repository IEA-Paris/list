<template>
  <ListMoleculesHeader :type="type" />
  <component :is="view">
    <component
      :is="itemTemplate"
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      :index="index"
      :pathPrefix
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
import { nextTick, watch } from "vue"
import { useRootStore } from "../../../stores/root"
import { capitalize } from "../../../composables/useUtils"
import {
  useNuxtApp,
  resolveComponent,
  computed,
  onBeforeUnmount,
  onMounted,
  useI18n,
  useRoute,
  navigateTo,
} from "#imports"
const { $stores } = useNuxtApp()
const { locale } = useI18n()
const route = useRoute()
const rootStore = useRootStore()
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
const numberOfPages = computed(() => $stores[props.type].numberOfPages)

const page = computed(() => {
  const p = parseInt(route.query.page, 10)
  return !isNaN(p) && p > 0 ? p : 1
})

const items = computed(() => $stores[props.type].items)
console.log("setup list")

// On mounted: load filters and data
onMounted(async () => {
  // Load any route filters
  rootStore.loadRouteQuery(props.type)
  // Initialize store page from URL
  const pageParam = parseInt(route.query.page, 10)
  if (!isNaN(pageParam) && pageParam > 1) {
    await rootStore.updatePage({
      page: pageParam,
      type: props.type,
      lang: locale.value,
    })
  }
  // Fetch initial items
  try {
    await rootStore.update(props.type, locale.value)
  } catch (e) {
    console.error("Error fetching list:", e)
  }
})

watch(
  () => page.value,
  async (newPage) => {
    const query = {
      ...route.query,
      page: newPage > 1 ? String(newPage) : undefined,
    }
    navigateTo({ query }, { replace: true })
    await nextTick()
    window.scrollTo({ top: 0, behavior: "smooth" })
  },
)
onBeforeUnmount(() => {
  rootStore.resetState(props.type, locale.value)
})

async function onPageChange(newPage) {
  await rootStore.updatePage({
    page: newPage,
    type: props.type,
    lang: locale.value,
  })
}
</script>

<template>
  <ListMoleculesHeader :type="type" />
  <component :is="view">
    <component
      :is="itemTemplate"
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      :index="index"
    />
  </component>
  <div class="text-center">
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

const page = computed(() => +$stores[props.type].page)

const items = computed(() => $stores[props.type].items)
console.log("setup list")
onMounted(() => {
  // Initialize the page from the route
  console.log("mounted list")
})
rootStore.loadRouteQuery(props.type)
try {
  await rootStore.update(props.type, locale.value)
} catch (error) {
  console.log("error fetching update list: ", error)
}
onBeforeUnmount(() => {
  rootStore.resetState(props.type, locale.value)
})

const onPageChange = (newPage) => {
  rootStore.updatePage({ page: newPage, type: props.type, lang: locale.value })

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}
</script>

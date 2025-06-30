<template>
  <ListMoleculesResultsHeader :type="props.type" />
  <div class="results-container">
    <component
      :is="itemTemplate"
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      :index="index"
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
} from "#imports"
const { $stores } = useNuxtApp()
const { locale } = useI18n()

const rootStore = useRootStore()
const props = defineProps({
  type: {
    type: String,
    default: "people",
    required: true,
  },
  items: [Object],
})

const itemTemplate = computed(() =>
  resolveComponent(
    (
      capitalize(props.type) +
      capitalize($stores[props.type].view.name) +
      "Item"
    ).toString(),
  ),
)

const items = computed(() => $stores[props.type].items)
onMounted(() => {
  // Initialize the page from the route
  console.log("mounted list")
})
try {
  await rootStore.update(props.type, locale.value)
} catch (error) {
  console.log("error fetching update list: ", error)
}
onBeforeUnmount(() => {
  rootStore.resetState(props.type, locale.value)
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

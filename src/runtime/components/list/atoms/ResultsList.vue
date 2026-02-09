<template>
  <component
    :is="itemTemplate"
    v-for="(item, index) in rootStore.results[type].items"
    :key="index"
    :item="item"
    :index="index"
  />
</template>
<script setup>
import { capitalize } from "../../../composables/useUtils"
import { useRootStore } from "../../../stores/root"
import { useNuxtApp, resolveComponent, computed } from "#imports"
const { $stores } = useNuxtApp()
const rootStore = useRootStore()

const props = defineProps({
  type: {
    type: String,
    default: "people",
  },
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
console.log("ResultsList props:", itemTemplate, $stores[props.type].view.name)
console
</script>

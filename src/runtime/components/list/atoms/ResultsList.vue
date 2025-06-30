<template>
  <component
    :is="itemTemplate"
    v-for="(item, index) in $rootStore.results[type].items"
    :key="index"
    :item="item"
    :index="index"
  />
</template>
<script setup>
import { capitalize } from "../../../composables/useUtils"
import { useNuxtApp, resolveComponent, computed } from "#imports"
const { $stores, $rootStore } = useNuxtApp()
console.log("rootStore: ", $rootStore)
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
</script>

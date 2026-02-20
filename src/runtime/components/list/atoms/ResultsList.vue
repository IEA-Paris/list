<template>
  <NuxtLink
    v-for="(item, index) in rootStore.results[type]?.items || []"
    :key="(item.name || item.lastname) + type + index"
    :to="
      localePath({
        name: pathPrefix,
        params: { slug: item.slug },
      })
    "
    class="text-decoration-none text-black w-100"
  >
    <component :is="itemTemplate" :item="item" :index="index" />
  </NuxtLink>
</template>
<script setup>
import { capitalize } from "../../../composables/useUtils"
import { useRootStore } from "../../../stores/root"
import { useNuxtApp, resolveComponent, computed, useLocalePath } from "#imports"
const localePath = useLocalePath()
const { $stores } = useNuxtApp()
const rootStore = useRootStore()

const props = defineProps({
  type: {
    type: String,
    default: "people",
  },
  pathPrefix: {
    type: String,
    default: "people-slug",
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

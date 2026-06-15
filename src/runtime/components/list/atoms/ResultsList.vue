<template>
  <NuxtLink
    v-for="(item, index) in rootStore.results[type]?.items || []"
    :key="item.slug || (item.name || item.lastname) + type + index"
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
  // The underlying list module that owns the item card + store config. For
  // modifier sub-categories (e.g. team, tools, media) this differs from
  // `type`, which is only a result bucket key. Defaults to `type` so plain
  // per-module list views keep working unchanged.
  parentType: {
    type: String,
    default: "",
  },
  pathPrefix: {
    type: String,
    default: "people-slug",
  },
})

const resolvedParentType = computed(() => props.parentType || props.type)

const itemTemplate = computed(() =>
  resolveComponent(
    (
      capitalize(resolvedParentType.value) +
      capitalize($stores[resolvedParentType.value].view.name) +
      "Item"
    ).toString(),
  ),
)
</script>

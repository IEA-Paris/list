<template>
  <div class="pa-6 border-thin w-100">
    <div class="text-overline">{{ $t("related." + type) }}</div>
    <component
      :is="capitalize(type) + 'RelatedItem'"
      v-for="item in items"
      :key="item.id || item.slug || item.name"
      :item="item"
    />
  </div>
</template>

<script setup>
import { useRootStore } from "../../../stores/root"
import { capitalize } from "../../../composables/useUtils"
const rootStore = useRootStore()
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
})
</script>

<style></style>

<template>
  <v-autocomplete
    v-model="val"
    :items="props.items"
    :multiple="$stores[type].filters[name]?.multiple || false"
  />
</template>

<script setup>
import { useRootStore } from "../../../stores/root";
import { useNuxtApp, computed } from "#imports";

const rootStore = useRootStore();
const { $stores } = useNuxtApp();
const props = defineProps(["type", "items", "name"]);
const val = computed({
  get() {
    return $stores[props.type].filters[props.name]?.value || [];
  },
  set(value) {
    return rootStore.updateFilter(props.name, value, props.type);
  },
});
</script>

<style lang="scss"></style>

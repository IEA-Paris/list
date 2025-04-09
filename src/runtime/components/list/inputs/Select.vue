<template>
  <v-select
    v-model="val"
    :items="props.items"
    :multiple="$stores[type].filters[name]?.multiple || false"
  />
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRootStore } from "../../../stores/root";
import { useNuxtApp } from "#imports";

const rootStore = useRootStore();
const { $stores } = useNuxtApp();
const props = defineProps(["type", "items", "name"]);
const val = computed({
  get() {
    return $stores[props.type].filters[props.name]?.value || [];
  },
  set(value) {
    rootStore.updateFilter(props.name, value, props.type);
  },
});
onMounted(() => {
  console.log(props);
});
</script>

<style lang="scss"></style>

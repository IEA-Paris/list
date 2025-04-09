<template>
  <v-checkbox v-model="val" />
</template>

<script setup>
import { computed } from "vue";
import { useRootStore } from "../../../stores/root";
import { useNuxtApp } from "#imports";

const rootStore = useRootStore();
const props = defineProps(["type", "items", "name"]);
const { $stores } = useNuxtApp();
const val = computed({
  get() {
    return $stores[props.type].filters[props.name]?.value;
  },
  set(value) {
    rootStore.updateFilter(props.name, value, props.type);
  },
});
</script>

<style lang="scss"></style>

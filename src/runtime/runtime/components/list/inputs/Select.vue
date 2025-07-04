<template>
  <v-select
    v-model="val"
    :items="props.items"
    :multiple="$stores[type].filters[name]?.multiple || false"
  />
</template>

<script setup>
import { useRootStore } from "../../../stores/root"
import { useNuxtApp, computed, useI18n } from "#imports"
const { locale } = useI18n()
const rootStore = useRootStore()
const { $stores } = useNuxtApp()
const props = defineProps(["type", "items", "name"])
const val = computed({
  get() {
    console.log(
      "$stores[props.type].filters[props.name]?.value: ",
      $stores[props.type].filters[props.name]?.value,
    )
    return $stores[props.type].filters[props.name]?.value || []
  },
  set(value) {
    rootStore.updateFilter(props.name, value, props.type, locale.value || "en")
  },
})
</script>

<style lang="scss"></style>

<template>
  <v-checkbox v-model="val" />
</template>

<script setup>
import { useRootStore } from "../../../stores/root"
import { useNuxtApp, computed, useI18n } from "#imports"
const { locale } = useI18n()
const rootStore = useRootStore()
const props = defineProps(["type", "items", "name"])
const { $stores } = useNuxtApp()
const val = computed({
  get() {
    return $stores[props.type].filters[props.name]?.value
  },
  set(value) {
    rootStore.updateFilter(props.name, value, props.type, locale.value)
  },
})
</script>

<style lang="scss"></style>

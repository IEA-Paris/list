<template>
  <v-tooltip location="top">
    <template #activator="{ props: tooltip }">
      <v-btn
        x-large
        outlined
        tile
        flat
        icon
        class="ml-auto"
        v-bind="tooltip"
        @click="rootStore.resetState(props.type, locale)"
      >
        <v-icon>mdi-restore</v-icon>
      </v-btn>
    </template>
    <span>{{ $t("list.reset-filters") }}</span>
  </v-tooltip>
</template>
<script setup>
import { useRootStore } from "../../../stores/root"
import { useI18n } from "#imports"
const { locale } = useI18n()
const rootStore = useRootStore()

const props = defineProps({
  type: {
    type: String,
    default: "articles",
    required: true,
  },
})
</script>
<style lang="scss"></style>

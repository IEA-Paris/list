<template>
  <v-tooltip location="top">
    <template v-slot:activator="{ props: tooltip }">
      <v-btn
        x-large
        outlined
        tile
        flat
        :class="{
          'mt-3': isXsDisplay,
        }"
        v-bind="tooltip"
        prepend-icon="mdi-tune-variant"
        :append-icon="open ? 'mdi-chevron-down' : 'mdi-chevron-up'"
        :loading="$stores[type] && $stores[type].loading"
        :disabled="$stores[type] && $stores[type].loading"
        @click="$emit('open', !open)"
      >
        <!--     <v-icon>mdi-tune-variant</v-icon> -->
        {{ $t("filters") }}
      </v-btn>
    </template>
    <div
      v-html="open ? $t('close-the-filter-panel') : $t('open-the-filter-panel')"
    ></div>
  </v-tooltip>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { useNuxtApp } from "#imports"
const { $stores } = useNuxtApp()
const {
  name: nameDisplay,
  xs: isXsDisplay,
  mobile: isMobileDisplay,
  smAndUp,
  lgAndUp,
  smAndDown,
} = useDisplay()
const props = defineProps({
  open: {
    type: Boolean,
    required: false,
    default: false,
  },
  type: {
    type: String,
    required: false,
    default: "",
  },
})
</script>

<style lang="scss" scoped></style>

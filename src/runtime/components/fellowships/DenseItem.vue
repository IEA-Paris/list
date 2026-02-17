<template>
  <v-row v-ripple no-gutters class="cursor-pointer highlight-on-hover">
    <v-col align-self="center" cols="8" class="text-h5 dense">
      <v-skeleton-loader
        v-if="loading"
        type="heading"
        width="75%"
        class="mb-2"
      />
      <div
        v-else
        v-html="
          $rootStore.search.length
            ? highlightAndTruncate(300, item.name, $rootStore.search.split(' '))
            : item.name
        "
      />
      <FellowshipsBadges :item="item" :loading="loading" />
    </v-col>
    <v-col align-self="center" cols="4">
      <v-skeleton-loader v-if="loading" type="chip" width="260" class="mt-2" />
      <MiscMoleculesChipContainer
        v-else
        :items="[
          $t('list.filters.fellowships.fellowshipType.' + item.fellowshipType),
          ...(props.item && props.item.disciplines
            ? props.item.disciplines.map((discipline) => discipline.name)
            : []),
        ]"
        class="mt-2"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import { useNuxtApp } from "#imports"
import { highlightAndTruncate } from "../../composables/useUtils"
const { $rootStore } = useNuxtApp()

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>

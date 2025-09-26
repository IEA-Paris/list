<template>
  <v-row v-ripple no-gutters class="cursor-pointer highlight-on-hover">
    <v-col align-self="center" cols="8" class="text-h5 dense">
      <v-skeleton-loader v-if="isLoading" type="heading" />
      <div
        v-else
        v-html="
          $rootStore.search.length
            ? highlightAndTruncate(300, item.name, $rootStore.search.split(' '))
            : item.name
        "
      />
      <FellowshipsBadges :item="item" />
    </v-col>
    <v-col align-self="center" cols="4">
      <v-skeleton-loader v-if="isLoading" type="chip@3" class="mt-2" />
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
import { useRootStore } from "../../stores/root"
import { computed } from "#imports"
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

  pathPrefix: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const rootStore = useRootStore()
const isLoading = computed(() => rootStore.loading || props.loading)
</script>

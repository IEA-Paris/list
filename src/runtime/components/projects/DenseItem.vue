<template>
  <v-row v-ripple no-gutters class="cursor-pointer highlight-on-hover">
    <v-col
      v-if="mdAndUp"
      align-self="center"
      cols="1"
      :offset="name.startsWith('search') ? 1 : 0"
    >
      <MiscAtomsImageContainer
        cover
        :loading="loading"
        :src="
          item && item.image && item.image.url ? item.image.url : '/default.png'
        "
        :ratio="1 / 1"
        :width="80"
      />
    </v-col>
    <v-col align-self="center" class="text-h5 dense pt-2">
      <v-skeleton-loader v-if="loading" type="heading" width="50%" />
      <span
        v-else
        v-html="
          searchQuery.length
            ? highlightAndTruncate(300, item.name, searchQuery.split(' '))
            : item.name
        "
      />

      <MiscMoleculesChipContainer
        v-if="item.tags"
        :items="item.tags || []"
        size="small"
      />

      <v-skeleton-loader v-if="loading" type="text@2" class="mt-3" />

      <MDC
        v-else-if="item.summary"
        class="text-caption font-weight-light paragraph mt-n2"
        :value="`${highlightAndTruncate(
          150,
          item.summary,
          searchQuery.split(' '),
        )}`"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "../../stores/root"
import { highlightAndTruncate } from "../../composables/useUtils"
import { useRoute, useNuxtApp, computed } from "#imports"
const { mdAndUp } = useDisplay()
const { name } = useRoute()

const rootStore = useRootStore()
const { $stores } = useNuxtApp()
const searchQuery = computed(() =>
  name.startsWith("search")
    ? rootStore.search
    : $stores["projects"].search || "",
)
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

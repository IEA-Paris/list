<template>
  <v-row v-ripple no-gutters class="cursor-pointer highlight-on-hover">
    <v-col v-if="mdAndUp" align-self="center" cols="1">
      <MiscAtomsImageContainer
        cover
        :loading="loading"
        :src="
          item && item.image && item.image.url ? item.image.url : '/default.png'
        "
        :ratio="1 / 1"
        :width="50"
      />
    </v-col>
    <v-col align-self="center" class="text-h5 dense pl-2">
      <v-skeleton-loader v-if="loading" type="heading" width="50%" />
      <span
        v-else
        v-html="
          rootStore.search.length
            ? highlightAndTruncate(300, item.name, rootStore.search.split(' '))
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
        class="text-caption font-weight-light paragraph"
        :value="`${highlightAndTruncate(
          150,
          item.summary,
          rootStore.search.split(' '),
        )}`"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "../../stores/root"
import { highlightAndTruncate } from "../../composables/useUtils"

const { mdAndUp } = useDisplay()

const rootStore = useRootStore()
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

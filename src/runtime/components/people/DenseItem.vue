<template>
  <v-row v-ripple no-gutters class="cursor-pointer highlight-on-hover">
    <v-col v-if="mdAndUp" cols="1" :offset="name.startsWith('search') ? 1 : 0">
      <MiscAtomsImageContainer
        cover
        :loading="loading"
        :src="
          item && item.image && item.image.url ? item.image.url : '/default.png'
        "
        :ratio="1 / 1"
        :width="80"
        class="ma-1"
      />
    </v-col>
    <v-col align-self="start" class="text-h6 dense px-2">
      <v-skeleton-loader v-if="loading" type="heading" />
      <div v-else class="d-flex text-h5 align-center">
        <span
          v-html="
            searchQuery.length
              ? highlightAndTruncate(
                  300,
                  item.firstname + ' ' + item.lastname,
                  searchQuery.split(' '),
                )
              : item.firstname + ' ' + item.lastname
          "
        />
        <v-spacer />
        <PeopleBadges :item="item" />
      </div>
      <div
        v-if="item.group && item.groups.vintage && item.groups.vintage[0].theme"
        class="text-body-1 font-weight-light paragraph"
        v-html="
          searchQuery.length
            ? highlightAndTruncate(
                300,
                item.groups.vintage[0].theme,
                searchQuery.split(' '),
              )
            : item.groups.vintage[0].theme
        "
      />
      <div
        v-if="item.summary && mdAndUp"
        class="text-body-1 font-weight-light paragraph"
        :style="
          '-webkit-line-clamp:' +
          [1, 1, 1, 2, 3, 3][
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(displayName || 'md')
          ]
        "
        v-html="
          searchQuery.length
            ? highlightAndTruncate(100, item.summary, searchQuery.split(' '))
            : item.summary
        "
      />
    </v-col>
  </v-row>
</template>

<script setup>
import { useRootStore } from "../../stores/root"
import { highlightAndTruncate } from "../../composables/useUtils"
import { computed, useRoute, useNuxtApp } from "#imports"
import { useDisplay } from "vuetify"
const { name } = useRoute()

const { mdAndUp, name: displayName } = useDisplay()
const rootStore = useRootStore()
const { $stores } = useNuxtApp()
const searchQuery = computed(() =>
  name.startsWith("search") ? rootStore.search : $stores["people"].search || "",
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
<style>
.paragraph {
  max-width: 83ch !important;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

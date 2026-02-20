<template>
  <v-row v-ripple no-gutters class="cursor-pointer highlight-on-hover">
    <v-col v-if="mdAndUp" cols="1">
      <MiscAtomsImageContainer
        cover
        :loading="loading"
        :src="
          item && item.image && item.image.url ? item.image.url : '/default.png'
        "
        :ratio="1 / 1"
        :width="70"
        class="ma-1"
      />
    </v-col>
    <v-col align-self="start" class="text-h6 dense px-2">
      <v-skeleton-loader v-if="loading" type="heading" />
      <div v-else class="d-flex text-h5 align-center">
        <span
          v-html="
            rootStore.search.length
              ? highlightAndTruncate(
                  300,
                  item.firstname + ' ' + item.lastname,
                  rootStore.search.split(' '),
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
          rootStore.search.length
            ? highlightAndTruncate(
                300,
                item.groups.vintage[0].theme,
                rootStore.search.split(' '),
              )
            : item.groups.vintage[0].theme
        "
      />
    </v-col>
  </v-row>
</template>

<script setup>
import { useRootStore } from "../../stores/root"
import { highlightAndTruncate } from "../../composables/useUtils"
import { computed } from "#imports"
import { useDisplay } from "vuetify"

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
<style>
.paragraph {
  max-width: 83ch !important;
}
</style>

<template>
  <v-row v-ripple no-gutters class="cursor-pointer highlight-on-hover my-2">
    <v-col v-if="mdAndUp" cols="1" class="align-center">
      <MiscAtomsImageContainer
        cover
        :loading="loading"
        :src="
          item && item.image && item.image.url ? item.image.url : '/default.png'
        "
        :ratio="1 / 1"
        width="80px"
      />
    </v-col>
    <v-col class="pl-2">
      <div class="inline-flex flex-row flex-wrap">
        <v-skeleton-loader v-if="loading" :type="heading" />

        <template v-else>
          <v-chip
            v-if="eventCategory"
            class="ma-2"
            variant="outlined"
            size="small"
            style="background-color: white; color: black"
          >
            {{ $t(eventCategory) }} </v-chip
          ><v-chip
            v-if="eventType"
            variant="outlined"
            size="small"
            class="mx-2"
            style="background-color: white; color: black"
          >
            {{ $t(eventType) }}
          </v-chip>
          <MiscMoleculesChipContainer
            v-if="item.tags && item.tags.length"
            :items="item.tags || []"
            size="small"
          />
        </template>
        <v-skeleton-loader v-if="loading" type="heading" />
        <span
          v-else
          class="text-h5 dense paragraph"
          v-html="
            rootStore.search.length
              ? highlightAndTruncate(
                  300,
                  item.name,
                  rootStore.search.split(' '),
                )
              : item.name
          "
        />

        <v-skeleton-loader v-if="loading" type="text@3" class="mt-2" />
        <MDC
          v-else
          class="text-body-1 font-weight-light paragraph"
          :value="`${highlightAndTruncate(
            150,
            item.summary,
            rootStore.search.split(' '),
          )}`"
        />
      </div> </v-col
  ></v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "../../stores/root"
import { highlightAndTruncate } from "../../composables/useUtils"
import { computed } from "#imports"
const rootStore = useRootStore()

const { mdAndUp } = useDisplay()
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

const eventCategory = computed(() => {
  if (props.item.category) {
    return "list.filters.publications.category." + props.item.category
  } else {
    return false
  }
})
const eventType = computed(() => {
  if (props.item.type) {
    return "list.filters.publications.type." + props.item.type
  } else {
    return false
  }
})
</script>

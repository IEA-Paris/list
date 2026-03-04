<template>
  <ListMoleculesDenseItemContainer>
    <v-col v-if="mdAndUp" cols="1">
      <MiscAtomsDateStamp
        v-if="item.date"
        :loading
        :date-start="item.date"
        class="mr-4"
      />
    </v-col>
    <v-col v-if="mdAndUp" align-self="start" cols="auto">
      <MiscAtomsImageContainer
        cover
        :loading="loading"
        :src="
          item && item.image && item.image.url ? item.image.url : '/default.png'
        "
        :ratio="1 / 1"
        :width="100"
      />
    </v-col>
    <v-col align-self="start" class="text-h5 dense pl-md-4 paragraph">
      <v-skeleton-loader v-if="loading" type="heading" />
      <template v-else>
        <v-skeleton-loader
          v-if="loading"
          :type="
            ['chip', 'chip@2', 'chip@3', 'chip@4', 'chip@4', 'chip@4'][
              ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
            ]
          "
        />

        <template v-else>
          <v-chip
            class="mb-2"
            style="background-color: white; color: black"
            size="small"
            variant="outlined"
          >
            {{ $t(eventCategory) }}
          </v-chip>
          <MiscMoleculesChipContainer :items="item.tags || []" size="small" />
        </template>
        <div
          v-html="
            searchQuery.length
              ? highlightAndTruncate(300, item.name, searchQuery.split(' '))
              : item.name
          "
        />

        <v-skeleton-loader v-if="loading" type="text@3" class="mt-2" />
        <MDC
          v-else-if="
            item.name.length < 80 &&
            item.summary &&
            item.summary.length &&
            mdAndUp
          "
          class="text-body-1 font-weight-light paragraph line-clamp-1"
          :value="`${highlightAndTruncate(
            150,
            item.summary,
            searchQuery.split(' '),
          )}`"
        />
      </template>
    </v-col>
  </ListMoleculesDenseItemContainer>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "../../stores/root"
import { highlightAndTruncate } from "../../composables/useUtils"
import { computed, useRoute, useNuxtApp } from "#imports"

const { name, mdAndUp } = useDisplay()
const rootStore = useRootStore()
const { name: routeName } = useRoute()
const { $stores } = useNuxtApp()
const searchQuery = computed(() =>
  routeName.startsWith("search")
    ? rootStore.search
    : $stores["news"].search || "",
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
const eventCategory = computed(() => {
  if (props.item.category) {
    return "list.filters.news.category." + props.item.category
  } else {
    return "list.filters.news.category.others"
  }
})
</script>

<template>
  <v-row v-ripple no-gutters class="cursor-pointer highlight-on-hover my-2">
    <v-col v-if="mdAndUp" align-self="center" cols="1">
      <MiscAtomsImageContainer
        cover
        :loading="isLoading"
        :src="
          item && item.image && item.image.url ? item.image.url : '/default.png'
        "
        :ratio="1 / 1"
        width="80px"
      />
    </v-col>
    <v-col align-self="start" class="text-h5 dense px-2 paragraph">
      <v-skeleton-loader v-if="isLoading" type="heading" />
      <template v-else>
        <v-skeleton-loader
          v-if="isLoading"
          :type="
            ['chip', 'chip@2', 'chip@3', 'chip@4', 'chip@4', 'chip@4'][
              ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
            ]
          "
        />

        <template v-else>
          <v-chip
            class="ma-2"
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
            $rootStore.search.length
              ? highlightAndTruncate(
                  300,
                  item.name,
                  $rootStore.search.split(' '),
                )
              : item.name
          "
        />
      </template>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "../../stores/root"
import { computed, useNuxtApp, useI18n } from "#imports"

const { $stores } = useNuxtApp()
const { name, mdAndUp } = useDisplay()
const { locale } = useI18n()

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
const eventCategory = computed(() => {
  if (props.item.category) {
    return "list.filters.news.category." + props.item.category
  } else {
    return "list.filters.news.category.others"
  }
})

const isLoading = computed(() => rootStore.loading || props.loading)
</script>

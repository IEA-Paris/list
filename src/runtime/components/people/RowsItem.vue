<template>
  <v-divider v-if="index > 0" />
  <v-row class="my-6 ml-md-1 px-3 px-md-0 highlight-on-hover">
    <v-col v-if="mdAndUp" cols="12" md="3">
      <MiscAtomsImageContainer
        cover
        :loading="loading"
        :src="item.image.url ? item.image : '/default.png'"
        :ratio="1 / 1"
      />
    </v-col>

    <v-col cols="12" md="8">
      <v-skeleton-loader
        v-if="loading"
        :type="
          [
            'heading, subtitle, text@5',
            'heading, subtitle, text@5',
            'heading, subtitle, text@3',
            'heading, subtitle, text@6',
            'heading, subtitle, text@9',
            'heading, subtitle, text@9',
          ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
        "
      />

      <div v-else class="ml-md-8">
        <div
          class="text-wrap text-h5 text-md-h4 text-black"
          v-html="
            searchQuery.length
              ? highlightAndTruncate(300, item.firstname + ' ' + item.lastname, searchQuery.split(' '))
              : item.firstname + ' ' + item.lastname
          "
        />
        <MiscAtomsSocials v-if="item.socials" :socials="item.socials" />
        <PeoplepBadges :item="item" />
        <div
          v-if="item.summary && item.summary.length > 0"
          class="text-wrap clamped-text text-black"
          :style="'-webkit-line-clamp:' + lineClamp"
        >
          <MDC :value="searchQuery.length ? highlightAndTruncate(500, item.summary, searchQuery.split(' ')) : item.summary" />
        </div>

        <div v-else class="text-body-2">
          {{ $t("no-biography") }}
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { computed, useRoute, useNuxtApp } from "#imports"
import { useRootStore } from "../../stores/root"
import { highlightAndTruncate } from "../../composables/useUtils"

const { name, mdAndUp } = useDisplay()
const rootStore = useRootStore()
const { $stores } = useNuxtApp()
const { name: routeName } = useRoute()
const searchQuery = computed(() =>
  routeName.startsWith('search') ? rootStore.search : ($stores['people'].search || '')
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
const lineClamp = computed(() => {
  let base = [5, 6, 3, 6, 8, 10][
    ["xs", "sm", "md", "lg", "xl", "xxl"].indexOf(name.value || "md")
  ]
  if (props.item?.socials && Object.keys(props.item.socials).length > 0) {
    base =
      base -
      [0, 0, 1, 1, 1, 2][
        ["xs", "sm", "md", "lg", "xl", "xxl"].indexOf(name.value || "md")
      ]
  }

  return base
})
</script>

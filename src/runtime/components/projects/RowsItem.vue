<template>
  <v-row class="highlight-on-hover pa-3">
    <v-col v-ripple cols="12" sm="6" md="4" lg="3" xl="2">
      <MiscAtomsImageContainer
        contain
        :src="item.image"
        :loading="loading"
        :ratio="1 / 1"
      />
    </v-col>
    <v-col
      v-ripple
      cols="12"
      sm="6"
      md="8"
      lg="9"
      xl="10"
      class="px-6 cursor-pointer"
    >
      <v-skeleton-loader
        v-if="loading"
        type="heading,ossein,text@8,ossein,button,button"
      />

      <template v-else>
        <div
          class="text-h5 text-sm-h3 text-md-h4 text-md-h4 my-6"
          v-html="
            searchQuery.length
              ? highlightAndTruncate(300, item.name, searchQuery.split(' '))
              : item.name
          "
        />
        <div
          v-if="item.summary"
          class="mt-n3 text-wrap clamped-text"
          :style="
            '-webkit-line-clamp:' +
            [5, 5, 4, 8, 10, 11][
              ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
            ]
          "
        >
          <MDC
            :value="
              searchQuery.length
                ? highlightAndTruncate(
                    500,
                    item.summary,
                    searchQuery.split(' '),
                  )
                : item.summary
            "
          />
        </div>

        <v-btn
          class="mt-4"
          variant="outlined"
          tile
          :size="
            ['small', 'small', 'small', 'default', 'default', 'large'][
              ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
            ]
          "
        >
          {{ $t("read-more") }}
        </v-btn>
        <v-btn
          variant="outlined"
          tile
          class="mt-4 ml-0 ml-md-4"
          prepend-icon="mdi-web"
          :size="
            ['small', 'small', 'small', 'default', 'default', 'large'][
              ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
            ]
          "
        >
          {{ $t("visit-the-project-website") }}
        </v-btn>
      </template>
    </v-col>
  </v-row>
  <v-divider class="my-6" />
</template>

<script setup>
import { useDisplay } from "vuetify"
import { computed, useRoute, useNuxtApp } from "#imports"
import { useRootStore } from "../../stores/root"
import { highlightAndTruncate } from "../../composables/useUtils"

const { name } = useDisplay()
const rootStore = useRootStore()
const { $stores } = useNuxtApp()
const { name: routeName } = useRoute()
const searchQuery = computed(() =>
  routeName.startsWith("search")
    ? rootStore.search
    : $stores["projects"].search || "",
)

const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {}
    },
    required: true,
  },

  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>

<style lang="scss"></style>

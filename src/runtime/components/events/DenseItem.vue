<template>
  <v-row v-ripple no-gutters class="cursor-pointer highlight-on-hover my-2">
    <v-col v-if="mdAndUp" cols="1">
      <MiscAtomsDateStamp
        v-if="item.start"
        :loading="isLoading"
        :date-start="item.start"
        :date-stop="item.stop"
        class="pr-6 mt-md-2"
      />
    </v-col>
    <v-col v-if="mdAndUp" cols="1">
      <MiscAtomsImageContainer
        cover
        :loading="isLoading"
        :src="
          item && item.image && item.image.url ? item.image.url : '/default.png'
        "
        :ratio="1 / 1"
        :width="80"
      />
    </v-col>

    <v-col align-self="start" class="pl-2">
      <v-skeleton-loader
        v-if="isLoading"
        type="chip"
        class="mr-3"
        width="120"
      />
      <v-chip
        v-else
        class="mr-3"
        color="black"
        size="small"
        style="background-color: white; color: black"
        tile
        variant="outlined"
      >
        {{ $t("list.filters.events.category." + item.category) }}
      </v-chip>
      <v-skeleton-loader
        v-if="isLoading && smAndDown"
        type="text"
        width="90"
        class="d-inline-block"
      />
      <span v-else-if="smAndDown" class="text-overline">
        {{
          new Date(item.start).toLocaleDateString(locale, {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
        }}
      </span>

      <v-skeleton-loader
        v-if="isLoading"
        type="heading"
        width="80%"
        class="mt-2"
      />

      <div
        v-else
        class="text-h5 dense paragraph mt-2"
        v-html="
          $rootStore.search.length
            ? highlightAndTruncate(300, item.name, $rootStore.search.split(' '))
            : item.name
        "
      />
      <v-skeleton-loader v-if="isLoading" type="text@3" class="mt-2" />
      <MDC
        v-else
        class="text-body-1 font-weight-light paragraph"
        :value="`${highlightAndTruncate(
          85,
          item.summary,
          $rootStore.search.split(' '),
        )}`"
      />
    </v-col>

    <v-col align-self="center" cols="auto">
      <v-skeleton-loader v-if="isLoading" type="button" />
      <div v-else>
        <EventsBadges :item />
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { useI18n, useNuxtApp, computed } from "#imports"
import { useDisplay } from "vuetify"
import { useRootStore } from "../../stores/root"
const { $rootStore } = useNuxtApp()
const { smAndDown, mdAndUp } = useDisplay()

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

const isLoading = computed(() => rootStore.loading || props.loading)
</script>

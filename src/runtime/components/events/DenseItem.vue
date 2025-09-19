<template>
  <NuxtLink :to="localePath(pathPrefix + item.slug[locale])">
    <v-row v-ripple no-gutters class="cursor-pointer highlight-on-hover my-2">
      <v-col v-if="mdAndUp" cols="1">
        <MiscAtomsDateStamp
          v-if="item.start"
          :loading="$stores['events'].loading"
          :date-start="item.start"
          :date-stop="item.stop"
          class="pr-6 mt-md-2"
        />
      </v-col>
      <v-col v-if="mdAndUp" cols="1">
        <MiscAtomsImageContainer
          cover
          :loading="$stores.events.loading"
          :src="
            item && item.image && item.image.url
              ? item.image.url
              : '/default.png'
          "
          :ratio="1 / 1"
          :name="item.name"
          link="events-slug"
          :width="80"
        />
      </v-col>

      <v-col align-self="start" class="pl-2">
        <v-chip
          class="mr-3"
          color="black"
          size="small"
          style="background-color: white; color: black"
          tile
          variant="outlined"
        >
          {{ $t("list.filters.events.category." + item.category) }}
        </v-chip>
        <span v-if="smAndDown" class="text-overline">
          {{
            new Date(item.start).toLocaleDateString(locale, {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })
          }}
        </span>

        <div
          class="text-h5 dense paragraph mt-2"
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
        <MDC
          class="text-body-1 font-weight-light paragraph"
          :value="`${highlightAndTruncate(
            85,
            item.summary,
            $rootStore.search.split(' '),
          )}`"
        />
      </v-col>

      <v-col align-self="center" cols="auto">
        <EventsBadges :item />
      </v-col> </v-row
  ></NuxtLink>
</template>

<script setup>
import { useLocalePath, useI18n, useNuxtApp } from "#imports"
import { useDisplay } from "vuetify"
const { $rootStore } = useNuxtApp()
const { smAndDown, mdAndUp, lgAndUp } = useDisplay()

const { locale } = useI18n()
const localePath = useLocalePath()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  pathPrefix: {
    type: String,
    required: true,
    default: "/",
  },
})
</script>

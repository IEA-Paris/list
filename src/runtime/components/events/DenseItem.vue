<template>
  <v-row
    v-ripple
    no-gutters
    class="cursor-pointer highlight-on-hover"
    @click="$router.push(localePath('/activities/events/' + item.slug[locale]))"
  >
    <v-col v-if="mdAndUp" align-self="center" cols="1">
      <MiscAtomsImageContainer
        cover
        :loading="$stores.events.loading"
        :src="item.image.url ? item.image : '/default.png'"
        :ratio="1 / 1"
        :name="item.name"
        :slug="item.slug"
        link="events-slug"
        width="80px"
      />
    </v-col>

    <v-col align-self="center" class="pl-2">
      <div class="text-h5 dense text-overline font-weight-black">
        {{
          $t("list.filters.events.category." + item.category) +
          " / " +
          new Date(item.start).toLocaleDateString(locale, {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
        }}
      </div>
      <div class="text-h5 dense">
        {{ item.name }}
      </div>
    </v-col>

    <v-col align-self="center" cols="auto">
      <EventsBadges :item />
    </v-col>
  </v-row>
</template>

<script setup>
import { useLocalePath, useI18n } from "#imports"
import { useDisplay } from "vuetify"
const { mdAndUp } = useDisplay()

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
})
</script>

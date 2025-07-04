<template>
  <v-row
    v-ripple
    no-gutters
    class="cursor-pointer highlight-on-hover my-2"
    @click="$router.push(localePath('/activities/events/' + item.slug[locale]))"
  >
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
        :src="item.image.url ? item.image : '/default.png'"
        :ratio="1 / 1"
        :name="item.name"
        :slug="item.slug"
        link="events-slug"
        width="80px"
      />
    </v-col>

    <v-col align-self="top" class="pl-2">
      <v-chip
        class="mr-3"
        color="black"
        :size="mdAndUp ? 'default' : 'small'"
        style="background-color: white; color: black"
        tile
        variant="outlined"
      >
        {{ $t("list.filters.events.category." + item.category) }}
      </v-chip>

      <div class="text-h5 dense paragraph">
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

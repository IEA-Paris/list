<template>
  <v-row
    v-ripple
    no-gutters
    class="cursor-pointer highlight-on-hover"
    @click="$router.push(localePath('/people/' + item.slug))"
  >
    <v-col v-if="mdAndUp" align-self="center" cols="1">
      <MiscAtomsImageContainer
        cover
        :loading="$stores.people.loading"
        :src="item.image.url ? item.image : '/default.png'"
        :ratio="1 / 1"
        :name="item.lastname + ' ' + item.firstname"
        :slug="item.slug"
        link="people-slug"
        width="50"
      />
    </v-col>
    <v-col align-self="center" class="text-h6 pl-2">
      <v-skeleton-loader v-if="rootStore.loading" type="heading" />
      <div v-else class="text-h5">
        {{ item.firstname + " " + item.lastname }}
      </div>
      <div class="mt-2 text-body-2 font-weight-light">
        {{ item.groups.vintage ? item.groups.vintage[0].theme : "" }}
      </div>
    </v-col>
    <v-col align-self="center">
      <PeopleGroupBadges :item="item" />
    </v-col>
  </v-row>
</template>

<script setup>
import { useRootStore } from "../../stores/root"
import { useNuxtApp, useLocalePath } from "#imports"
import { useDisplay } from "vuetify"

const { mdAndUp } = useDisplay()
const { $stores } = useNuxtApp()
const localePath = useLocalePath()
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
})
</script>

<template>
  <v-row
    v-ripple
    no-gutters
    class="cursor-pointer highlight-on-hover"
    @click="$router.push(localePath('/people/' + item.slug))"
  >
    <v-col align-self="center" class="text-h6 pl-2">
      <v-skeleton-loader
        v-if="rootStore.loading || $stores[type].loading"
        type="heading"
      />
      <template v-else>
        {{ item.firstname + " " + item.lastname }}
      </template>
    </v-col>
    <v-col align-self="center">
      <PeopleGroupBadges :item="item" />
    </v-col>
  </v-row>
</template>

<script setup>
import { useRootStore } from "../../stores/root";
import { useNuxtApp, useLocalePath } from "#imports";

const { $stores } = useNuxtApp();
const localePath = useLocalePath();
const rootStore = useRootStore();
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
</script>

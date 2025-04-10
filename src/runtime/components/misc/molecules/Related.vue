<template>
  <v-row>
    <v-col
      v-for="(items, type) in filteredRelatedItems"
      :key="type"
      cols="12"
      md="6"
      lg="4"
      xl="3"
      class="d-flex flex-column align-center"
    >
      <MiscMoleculesRelatedItems :type="type" :items="items" />
    </v-col>
  </v-row>
</template>

<script setup>
import { computed } from "#imports";

const props = defineProps({
  related: {
    type: Object,
    required: true,
  },
});

const typeMapping = {
  events: "events",
  people: "people",
  news: "news",
  projects: "projects",
};

const filteredRelatedItems = computed(() => {
  const result = {};
  for (const key in typeMapping) {
    if (props.related[key] && props.related[key].length > 0) {
      result[typeMapping[key]] = props.related[key];
    }
  }
  return result;
});
</script>

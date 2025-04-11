<template>
  <v-row no-gutters>
    <v-col cols="12">
      <div class="d-flex">
        <ListAtomsFiltersMenu
          :open="filtersOpen"
          @open="filtersOpen = $event"
        />
        <v-spacer />
        <ListAtomsViewMenu :type="type" />
        <ListAtomsSortMenu :type="type" />
      </div>
      <v-expand-transition>
        <div v-if="filtersOpen" class="mb-7">
          <ListMoleculesFilters :type="type" />
        </div>
      </v-expand-transition>
      <ListAtomsSearchInput :type="type" />
      <ListAtomsSearchString :type="type" />
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";

import { useRoute } from "#imports";

const route = useRoute();

const filtersOpen = ref(!!Object.keys(route.query)?.length);

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: "",
  },
});
</script>

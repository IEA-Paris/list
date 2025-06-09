<template>
  <v-row no-gutters>
    <v-col cols="12">
      <div class="d-flex">
        <ListAtomsFiltersMenu
          :open="filtersOpen || visible"
          @open="filtersOpen = $event"
        />
        <v-spacer />
        <ListAtomsResetButton v-if="visible" :type="type" />
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
import { ref, computed } from "vue";

const filtersOpen = ref(false);
const visible = computed(() => {
  return $stores[type]?.filtersCount && $stores[type]?.filtersCount > 0;
});
const props = defineProps({
  type: {
    type: String,
    required: false,
    default: "",
  },
});
</script>

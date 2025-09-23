<template>
  <v-row no-gutters>
    <v-col cols="12">
      <div class="d-flex">
        <ListAtomsFiltersMenu
          :open="filtersOpen ?? visible"
          @open="filtersOpen = $event"
        />
        <v-spacer />
        <ListAtomsResetButton
          v-if="
            $stores[type].filtersCount ||
            ($stores[type].search && $stores[type].search.trim() !== '')
          "
          :type
        />
        <ListAtomsViewMenu :type />
        <ListAtomsSortMenu :type />
      </div>
      <v-expand-transition>
        <div v-show="filtersOpen" class="mb-7">
          <ListMoleculesFilters :type />
        </div>
      </v-expand-transition>

      <ListAtomsSearchInput :type />
      <ListAtomsSearchString :type />
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, computed } from "vue"
import { useNuxtApp } from "#imports"
const { $stores } = useNuxtApp()

const filtersOpen = ref(false)
const visible = computed(() => {
  console.log(
    "$stores[props.type]?.filtersCount > 0: ",
    $stores[props.type]?.filtersCount > 0
  )
  console.log(
    "$stores[props.type]?.filtersCount: ",
    $stores[props.type]?.filtersCount
  )
  console.log(
    !!(
      $stores[props.type]?.filtersCount && $stores[props.type]?.filtersCount > 0
    )
  )
  return !!(
    $stores[props.type]?.filtersCount && $stores[props.type]?.filtersCount > 0
  )
})
const props = defineProps({
  type: {
    type: String,
    required: false,
    default: "",
  },
})
</script>

<template>
  <v-row no-gutters>
    <v-col cols="12">
      <!--    <v-btn
        v-if="rootStore.addBtn"
        x-large
        :height="mdAndUp ? '56' : '40'"
        outlined
        :rounded="0"
        color="primary"
        :to="localePath($route.fullPath + '/create')"
      >
        <v-icon left>mdi-plus</v-icon>
        {{ $t("new-x", { item: $tc("x-" + type, 1) }) }}
      </v-btn> -->
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
          <ListMoleculesFilters :type="type" /></div
      ></v-expand-transition>
      <ListAtomsSearchInput :type="type" />
      <ListAtomsSearchString :type="type" />
    </v-col>
  </v-row>
</template>

<script setup>
const route = useRoute()

const filtersOpen = ref(!!Object.keys(route.query)?.length)

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: "",
  },
})
</script>

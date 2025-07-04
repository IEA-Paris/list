<template>
  <span>
    <v-skeleton-loader
      v-if="rootStore.loading || $stores.people.loading"
      type="chip"
    />
    <template v-else-if="item.groups">
      <template v-for="(value, key, index) in item.groups" :key="key + index">
        <template v-if="value && key === 'vintage'">
          <v-chip
            v-for="(vintage, index2) in item.groups.vintage"
            :key="index2"
            size="small"
            class="mt-3 mr-3"
            variant="outlined"
            tile
            style="background-color: white; color: black"
          >
            {{ $t("vintage", [vintage.year]) }}
          </v-chip>
        </template>

        <v-chip
          v-if="
            value &&
            key !== 'fellows' &&
            ((!item.groups.vintage && key === 'vintage') ||
              !['vintage', '__typename'].includes(key))
          "
          class="mt-3 mr-3"
          size="small"
          color="black"
          style="background-color: white; color: black"
          tile
          variant="outlined"
        >
          {{ $t("list.filters.people.groups." + key) }}
        </v-chip>
      </template>
      <template
        v-for="(value, key, index) in item.disciplines"
        :key="key + index"
      >
        <v-chip
          v-if="value && index < 3"
          class="mt-3 mr-3"
          color="black"
          size="small"
          style="background-color: white; color: black"
          tile
          variant="outlined"
        >
          {{ $t("disciplines." + key) }}
        </v-chip>
      </template>
    </template></span
  >
</template>

<script setup>
import { useRootStore } from "../../stores/root"
import { useNuxtApp } from "#imports"
import { useDisplay } from "vuetify"
const { mdAndUp } = useDisplay()
const rootStore = useRootStore()
const { $stores } = useNuxtApp()
const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({}),
  },
})
</script>

<style lang="scss" scoped></style>

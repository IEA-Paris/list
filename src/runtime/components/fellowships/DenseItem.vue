<template>
  <v-row
    v-ripple
    no-gutters
    class="cursor-pointer highlight-on-hover pt-2 pl-md-2"
  >
    <v-col
      v-if="mdAndUp"
      cols="1"
      class="align-center"
      :offset="name.startsWith('search') ? 1 : 0"
    >
      <MiscAtomsImageContainer
        cover
        :loading="loading"
        :src="item?.image?.url || '/default.png'"
        :ratio="1 / 1"
        :width="100"
      />
    </v-col>

    <v-col
      :cols="mdAndUp ? 8 : undefined"
      class="text-h5 dense d-flex flex-column ml-md-2"
      :offset="name.startsWith('search') ? 1 : 0"
    >
      <v-skeleton-loader
        v-if="loading"
        type="heading"
        width="75%"
        class="mb-2"
      />
      <div
        v-else
        v-html="
          searchQuery.length
            ? highlightAndTruncate(300, item.name, searchQuery.split(' '))
            : item.name
        "
      />
      <FellowshipsBadges :item="item" :loading="loading" />

      <template v-if="mdAndDown">
        <v-skeleton-loader
          v-if="loading"
          type="chip"
          width="260"
          class="mt-2"
        />
        <MiscMoleculesChipContainer
          v-else
          :items="[
            $t(
              'list.filters.fellowships.fellowshipType.' + item.fellowshipType,
            ),
            ...(props.item?.disciplines?.map((discipline) => discipline.name) ??
              []),
          ]"
        />
      </template>
    </v-col>

    <v-col v-if="mdAndUp" class="d-flex flex-column">
      <v-skeleton-loader v-if="loading" type="chip" width="260" class="mt-2" />
      <MiscMoleculesChipContainer
        v-else
        :items="[
          $t('list.filters.fellowships.fellowshipType.' + item.fellowshipType),
          ...(props.item?.disciplines?.map((discipline) => discipline.name) ??
            []),
        ]"
        class="mt-2"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { useNuxtApp, useRoute, computed } from "#imports"
import { highlightAndTruncate } from "../../composables/useUtils"
const { $rootStore, $stores } = useNuxtApp()
const { name } = useRoute()
const { mdAndUp, mdAndDown } = useDisplay()
const searchQuery = computed(() =>
  name.startsWith("search")
    ? $rootStore.search
    : $stores["fellowships"].search || "",
)
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
})

console.log("Item", props.item)
</script>

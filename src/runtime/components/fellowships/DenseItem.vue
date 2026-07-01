<template>
  <ListMoleculesDenseItemContainer>
    <v-col
      v-if="mdAndUp"
      cols="auto"
      class="align-center"
      :offset="name.startsWith('search') ? 1 : 0"
    >
      <MiscAtomsImageContainer
        cover
        :loading="loading"
        :src="
          item && item.image && item.image.url ? item.image.url : '/default.png'
        "
        :ratio="1 / 1"
        :width="100"
      />
    </v-col>

    <v-col
      :cols="mdAndUp ? 8 : undefined"
      class="text-h5 dense d-flex flex-column"
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
        class="pl-md-4"
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
          v-else-if="fellowshipTypeLabels.length"
          :items="fellowshipTypeLabels"
          class="mt-2"
        />
        <!-- DISCIPLINES -->
        <MiscMoleculesDisciplinesTags
          v-if="loading || (item.disciplines && item.disciplines.length)"
          :disciplines="item.disciplines"
          :loading="loading"
          inline
          class="mt-2"
        />
      </template>
    </v-col>

    <v-col v-if="mdAndUp" class="d-flex flex-column" cols="1">
      <v-skeleton-loader v-if="loading" type="chip" width="260" class="mt-2" />
      <template v-else>
        <MiscMoleculesChipContainer
          v-if="fellowshipTypeLabels.length"
          :items="fellowshipTypeLabels"
          class="mt-2"
        />
        <!-- DISCIPLINES -->
        <MiscMoleculesDisciplinesTags
          v-if="item.disciplines && item.disciplines.length"
          :disciplines="item.disciplines"
          inline
          class="mt-2"
        />
      </template>
    </v-col>
  </ListMoleculesDenseItemContainer>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { useNuxtApp, useRoute, useI18n, computed } from "#imports"
import { highlightAndTruncate } from "../../composables/useUtils"
const { $rootStore, $stores } = useNuxtApp()
const { name } = useRoute()
const { t } = useI18n()
const { mdAndUp, mdAndDown, smAndDown } = useDisplay()
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

// fellowshipType is an array in the DB (e.g. ["LONG_STAY"]); translate each
// value. Tolerates a scalar too. Disciplines are rendered separately as pills.
const fellowshipTypeLabels = computed(() => {
  const ft = props.item?.fellowshipType
  const values = Array.isArray(ft) ? ft : ft ? [ft] : []
  return values.map((v) => t("list.filters.fellowships.fellowshipType." + v))
})
</script>

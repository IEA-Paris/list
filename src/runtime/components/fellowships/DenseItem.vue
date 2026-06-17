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
          v-else
          :items="[
            $t(
              'list.filters.fellowships.fellowshipType.' + item.fellowshipType,
            ),
            ...(props.item?.disciplines?.map((discipline) =>
              $t('list.filters.disciplines.' + discipline),
            ) ?? []),
          ]"
        />
      </template>
    </v-col>

    <v-col v-if="mdAndUp" class="d-flex flex-column" cols="1">
      <v-skeleton-loader v-if="loading" type="chip" width="260" class="mt-2" />
      <MiscMoleculesChipContainer
        v-else
        :items="[
          $t('list.filters.fellowships.fellowshipType.' + item.fellowshipType),
          ...(props.item?.disciplines.map((discipline) =>
            $t('list.filters.disciplines.' + discipline),
          ) ?? []),
        ]"
        class="mt-2"
      />
    </v-col>
  </ListMoleculesDenseItemContainer>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { useNuxtApp, useRoute, computed } from "#imports"
import { highlightAndTruncate } from "../../composables/useUtils"
const { $rootStore, $stores } = useNuxtApp()
const { name } = useRoute()
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
</script>

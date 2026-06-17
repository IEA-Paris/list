<template>
  <ListMoleculesDenseItemContainer>
    <v-col v-if="mdAndUp" cols="1">
      <MiscAtomsDateStamp
        v-if="item.start"
        :loading
        :date-start="item.start"
        :date-stop="item.stop"
        class="mr-4"
      />
    </v-col>
    <v-col v-if="mdAndUp" cols="auto">
      <MiscAtomsImageContainer
        cover
        :loading
        :src="
          item && item.image && item.image.url ? item.image.url : '/default.png'
        "
        :ratio="1 / 1"
        :width="100"
      />
    </v-col>

    <v-col align-self="start" class="pl-md-4">
      <v-skeleton-loader v-if="loading" type="chip" class="mr-3" width="120" />
      <span v-else>
        <v-chip
          class="mr-3"
          color="black"
          size="small"
          style="background-color: white; color: black"
          tile
          variant="outlined"
        >
          {{ $t("list.filters.events.category." + item.category) }}
        </v-chip>
        <!-- DISCIPLINES -->
        <MiscMoleculesDisciplinesTags :disciplines="item.disciplines" inline />
      </span>
      <v-skeleton-loader
        v-if="loading && smAndDown"
        type="text"
        width="90"
        class="d-inline-block"
      />
      <span v-else-if="smAndDown" class="text-overline">
        {{
          new Date(item.start).toLocaleDateString(locale, {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
        }}
      </span>

      <v-skeleton-loader
        v-if="loading"
        type="heading"
        width="80%"
        class="mt-2"
      />

      <div
        v-else
        class="text-h5 dense paragraph mt-1"
        v-html="
          searchQuery.length
            ? highlightAndTruncate(300, item.name, searchQuery.split(' '))
            : item.name
        "
      />
      <v-skeleton-loader v-if="loading" type="text@3" class="mt-2" />
      <MDC
        v-else-if="
          item.name.length < 80 &&
          item.summary &&
          item.summary.length &&
          mdAndUp
        "
        class="text-body-1 font-weight-light paragraph mt-n2 mb-n6"
        :value="`${highlightAndTruncate(
          150,
          item.summary,
          searchQuery.split(' '),
        )}`"
      />
    </v-col>
  </ListMoleculesDenseItemContainer>
</template>

<script setup>
import { useI18n, useNuxtApp, useRoute, computed } from "#imports"
import { useDisplay } from "vuetify"
import { useRootStore } from "../../stores/root"
import { highlightAndTruncate } from "../../composables/useUtils"
const { $rootStore, $stores } = useNuxtApp()
const { smAndDown, mdAndUp } = useDisplay()

const { locale } = useI18n()
const rootStore = useRootStore()
const { name: routeName } = useRoute()
const searchQuery = computed(() =>
  routeName.startsWith("search")
    ? $rootStore.search
    : $stores["events"].search || "",
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

<template>
  <ListMoleculesDenseItemContainer>
    <v-col
      v-if="mdAndUp"
      cols="auto"
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
        class="ma-1"
      />
    </v-col>
    <v-col align-self="start" class="dense ml-md-4">
      <!-- NAME ROW -->
      <v-skeleton-loader v-if="loading" type="heading" />
      <div
        v-else
        class="d-flex justify-space-between text-title text-h5 align-center pt-md-2"
      >
        <div class="d-flex align-center flex-wrap" style="gap: 8px">
          <span
            v-html="
              searchQuery.length
                ? highlightAndTruncate(
                    300,
                    item.firstname + ' ' + item.lastname,
                    searchQuery.split(' '),
                  )
                : item.firstname + ' ' + item.lastname
            "
          />
          <span v-if="isPresent" class="present-pill">
            <span class="present-dot" />
            {{ $t("present") }}
          </span>
        </div>

        <v-spacer />

        <!-- year badge bound to latest.year -->
        <v-chip
          v-if="latestYear"
          size="small"
          variant="outlined"
          tile
          style="background-color: white; color: black"
        >
          {{ $t("vintage", [latestYear]) }}
        </v-chip>
      </div>

      <!-- DISCIPLINES (translated, capped at 3 + overflow) -->
      <div
        v-if="disciplines.length"
        class="d-flex flex-wrap mt-2"
        style="gap: 6px"
      >
        <v-chip
          v-for="(d, i) in shownDisciplines"
          :key="d + i"
          size="small"
          tile
          variant="flat"
          color="grey-lighten-3"
          class="discipline-chip"
        >
          {{ disciplineLabel(d) }}
        </v-chip>
        <v-chip
          v-if="extraDisciplines"
          size="small"
          variant="flat"
          color="grey-lighten-3"
          class="discipline-chip"
        >
          +{{ extraDisciplines }}
        </v-chip>
      </div>

      <!-- THEME (Vintage only; non-fellows show nothing) -->
      <v-skeleton-loader v-if="loading" type="text" />
      <div
        v-else-if="latestTheme"
        class="theme-label mt-2"
        :style="'-webkit-line-clamp:' + themeLineClamp"
        v-html="
          searchQuery.length
            ? highlightAndTruncate(300, latestTheme, searchQuery.split(' '))
            : latestTheme
        "
      />
    </v-col>
  </ListMoleculesDenseItemContainer>
</template>

<script setup>
import { useRootStore } from "../../stores/root"
import { highlightAndTruncate } from "../../composables/useUtils"
import { computed, useRoute, useNuxtApp, useI18n } from "#imports"
import { useDisplay } from "vuetify"

const { name } = useRoute()
const { mdAndUp, name: displayName } = useDisplay()
const { t } = useI18n()
const rootStore = useRootStore()
const { $stores } = useNuxtApp()

const searchQuery = computed(() =>
  name.startsWith("search") ? rootStore.search : $stores["people"].search || "",
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

// latest union (field-presence based; __typename not selected in the query)
const latest = computed(() => props.item?.latest ?? null)
const latestYear = computed(() => latest.value?.year ?? null) // Vintage only
const latestTheme = computed(() => latest.value?.theme ?? null) // Vintage only

// "present" = currently in residence/post: started on or before today and not
// yet ended. Works for both Vintage (fellowship period) and Position (staff role)
// once latest.start/latest.stop are fetched. Degrades to false when absent.
const isPresent = computed(() => {
  const l = latest.value
  if (!l?.start) return false
  const now = Date.now()
  if (new Date(l.start).getTime() > now) return false
  if (!l.stop) return true
  return new Date(l.stop).getTime() >= now
})

// disciplines: scalar enum array → translated labels, capped at 3
const MAX_DISCIPLINES = 3
const disciplines = computed(() =>
  Array.isArray(props.item?.disciplines) ? props.item.disciplines : [],
)
const shownDisciplines = computed(() =>
  disciplines.value.slice(0, MAX_DISCIPLINES),
)
const extraDisciplines = computed(() =>
  Math.max(0, disciplines.value.length - MAX_DISCIPLINES),
)
const disciplineLabel = (d) => t("list.filters.disciplines." + d)

// responsive line-clamp for the theme (mirrors ExpandableDenseItem)
const breakpointIndex = computed(() =>
  ["xs", "sm", "md", "lg", "xl", "xxl"].indexOf(displayName.value || "md"),
)
const themeLineClamp = computed(() => [1, 1, 2, 2, 3, 3][breakpointIndex.value])
</script>

<style scoped>
.theme-label {
  font-size: 0.875rem;
  line-height: 1.4;
  opacity: 0.7;
  max-width: 83ch;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Disciplines: filled, rounded, soft grey — intentionally distinct from the
   outlined square year badge so the two chip types don't read as the same thing. */
.discipline-chip {
  color: rgba(0, 0, 0, 0.78);
  font-weight: 500;
  border-radius: 6px;
}

.present-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1;
  padding: 3px 8px;
  border-radius: 999px;
  background-color: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.7);
}
.present-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #4caf50; /* success green from static.config.ts — the only color accent */
}
</style>

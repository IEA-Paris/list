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

        <!-- year badges: one pill per calendar year the fellowship spans, so a
             cross-year vintage (start→stop over a boundary) shows e.g. 2025 and
             2026. Falls back to the single `year` when dates are absent. -->
        <div class="d-flex flex-wrap justify-end" style="gap: 4px">
          <v-chip
            v-for="year in vintageYears"
            :key="year"
            size="small"
            variant="outlined"
            tile
            style="background-color: white; color: black"
          >
            {{ $t("vintage", [year]) }}
          </v-chip>
        </div>
      </div>

      <!-- DISCIPLINES (translated, capped at 3 + overflow) -->
      <v-skeleton-loader
        v-if="loading"
        type="chip@3"
        class="discipline-skeleton mt-2"
      />
      <div
        v-else-if="disciplines.length"
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
const latestTheme = computed(() => latest.value?.theme ?? null) // Vintage only

// Expand a start→stop span into the calendar years it covers, e.g.
// 2024-09-01 → 2025-07-30 yields [2024, 2025]. [] if a bound is missing/invalid.
const spanYears = (start, stop) => {
  if (!start || !stop) return []
  const from = new Date(start).getFullYear()
  const to = new Date(stop).getFullYear()
  if (Number.isNaN(from) || Number.isNaN(to) || to < from) return []
  const years = []
  for (let y = from; y <= to; y++) years.push(y)
  return years
}

// Vintage year pills (deduped, ascending). Mirrors PeopleBadges: `latest`
// carries start/stop so its span expands to one year per calendar year (a
// cross-year fellowship → two pills); `groups.vintage[]` is queried without
// dates so each only contributes its single `year`. Falls back to `year` when
// no span is available.
const vintageYears = computed(() => {
  const years = new Set()

  const l = latest.value
  if (l?.year != null) {
    const span = spanYears(l.start, l.stop)
    if (span.length) span.forEach((y) => years.add(y))
    else years.add(l.year)
  }

  for (const v of props.item?.groups?.vintage ?? []) {
    if (v?.year != null) years.add(v.year)
  }

  return [...years].sort((a, b) => a - b)
})

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
  font-style: italic;
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

/* The skeleton root is already flex-wrap, so chip@3 bones sit in a row; only
   override the loader's default 16px chip margin to match the real 6px gap. */
.discipline-skeleton :deep(.v-skeleton-loader__chip) {
  margin: 0 6px 0 0;
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

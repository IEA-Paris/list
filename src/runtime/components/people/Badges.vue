<template>
  <span>
    <v-skeleton-loader
      v-if="rootStore.loading || $stores.people.loading"
      type="chip"
    />
    <template v-else-if="item.groups">
      <template v-for="(value, key, index) in item.groups" :key="key + index">
        <template v-if="value && key === 'vintage'">
          <!-- One pill per calendar year a vintage spans: an entry running
               from start to stop across a year boundary yields a pill for
               each year (e.g. 2025, 2026). Entries without dates fall back
               to their single `year`. -->
          <v-chip
            v-for="year in vintageYears"
            :key="year"
            size="small"
            class="mt-3 mr-1 mr-md-3"
            variant="outlined"
            tile
            style="background-color: white; color: black"
          >
            {{ $t("vintage", [year]) }}
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
import { computed, useNuxtApp } from "#imports"
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

// Expand a start→stop span into the list of calendar years it covers.
// e.g. 2024-09-01 → 2025-07-30 yields [2024, 2025]. Returns [] if either
// bound is missing or unparseable.
const spanYears = (start, stop) => {
  if (!start || !stop) return []
  const from = new Date(start).getFullYear()
  const to = new Date(stop).getFullYear()
  if (Number.isNaN(from) || Number.isNaN(to) || to < from) return []
  const years = []
  for (let y = from; y <= to; y++) years.push(y)
  return years
}

// Years to render as vintage pills, deduped and sorted ascending.
//
// `groups.vintage[]` is the authoritative list of fellowships (a fellow may
// have several) but is queried without start/stop, so it only contributes its
// single `year`. `latest` carries the actual start/stop, so its span is
// expanded into one year per calendar year — this is what turns a cross-year
// fellowship into two pills (e.g. 2025, 2026).
const vintageYears = computed(() => {
  const years = new Set()

  const latest = props.item?.latest
  // latest is the Vintage|Position union; only a Vintage carries a fellowship
  // span. Position (staff) has start/stop too but no `year`, so guard on year.
  if (latest?.year != null) {
    const span = spanYears(latest.start, latest.stop)
    if (span.length) span.forEach((y) => years.add(y))
    else years.add(latest.year)
  }

  for (const v of props.item?.groups?.vintage ?? []) {
    if (v?.year != null) years.add(v.year)
  }

  return [...years].sort((a, b) => a - b)
})
</script>

<style lang="scss" scoped></style>

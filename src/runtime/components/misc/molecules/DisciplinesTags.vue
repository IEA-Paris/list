<template>
  <v-skeleton-loader
    v-if="loading"
    type="chip@3"
    class="discipline-skeleton mt-2"
  />
  <div
    v-else-if="disciplines.length"
    class="flex-wrap"
    :class="[
      inline ? 'd-inline-flex align-center' : 'd-flex',
      justify === 'center' ? 'justify-center' : '',
    ]"
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
      tile
      color="grey-lighten-3"
      class="discipline-chip"
    >
      +{{ extraDisciplines }}
    </v-chip>
  </div>
</template>

<script setup>
import { computed, useI18n } from "#imports"

const { t } = useI18n()

const props = defineProps({
  // scalar enum array (e.g. item.disciplines)
  disciplines: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  // cap the number of chips; 0 = show all (used by detail views)
  max: {
    type: Number,
    default: 0,
  },
  // 'start' (dense list) | 'center' (detail views)
  justify: {
    type: String,
    default: "start",
  },
  // render as inline-flex so the chips flow on the same line as preceding
  // content (e.g. the category chip in the events dense item) instead of
  // forcing a block-level line break
  inline: {
    type: Boolean,
    default: false,
  },
})

// normalise to an array regardless of what the caller passes
const disciplines = computed(() =>
  Array.isArray(props.disciplines) ? props.disciplines : [],
)
const shownDisciplines = computed(() =>
  props.max > 0 ? disciplines.value.slice(0, props.max) : disciplines.value,
)
const extraDisciplines = computed(() =>
  props.max > 0 ? Math.max(0, disciplines.value.length - props.max) : 0,
)
const disciplineLabel = (d) => t("list.filters.disciplines." + d)
</script>

<style scoped>
/* Disciplines: filled, rounded, soft grey — the canonical chip language shared
   across the people list (DenseItem.vue) and the detail views. */
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
</style>

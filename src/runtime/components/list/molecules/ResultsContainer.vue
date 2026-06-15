<template>
  <div>
    <div class="d-flex align-center justify-space-between my-2">
      <v-btn
        v-if="mdAndUp"
        variant="text"
        class="mr-2"
        @click="$emit('toggle', type)"
        :disabled="total === 0"
        :aria-expanded="open ? 'true' : 'false'"
        :aria-label="$t(open ? 'show-less' : 'show-more')"
      >
        <v-icon>{{ open ? "mdi-chevron-down" : "mdi-chevron-right" }}</v-icon>
      </v-btn>
      <div
        class="d-flex flex-column cursor-pointer"
        role="button"
        :aria-expanded="open ? 'true' : 'false'"
        @click="$emit('toggle', type)"
      >
        <h4 class="mt-2 mb-0" :class="total > 0 ? 'black' : 'text-grey darken-2'">
          {{ label }}
        </h4>
        <div class="text-overline mb-2">
          {{
            $t(
              feminine ? "list.0-items-found-f" : "list.0-items-found",
              [total, $t("items." + props.type, total)],
              total,
            )
          }}
        </div>
      </div>
      <v-spacer />
      <v-btn
        color="default"
        variant="text"
        size="small"
        rounded="0"
        v-if="total > 3"
        :to="
          localePath({
            path: viewMore,
            query: { search: $rootStore.search },
          })
        "
      >
        {{ $t('list.pls-x-more', [total - 3], total - 3) }}
      </v-btn>
    </div>
    <slot />
  </div>
  <v-divider></v-divider>
</template>
<script setup>
import { useNuxtApp, useLocalePath, useI18n, computed } from "#imports"
import { useDisplay } from "vuetify"
const localePath = useLocalePath()
const { t } = useI18n()

const { mdAndUp } = useDisplay()

// Utility function to capitalize first letter
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

const { $rootStore } = useNuxtApp()

defineEmits(["toggle"])

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  feminine: {
    type: Boolean,
    required: false,
    default: false,
  },
  open: {
    type: Boolean,
    required: false,
    default: true,
  },
  // Optional i18n key override for the heading (people groups live outside the
  // `items.*` namespace). Falls back to `items.<type>` (pluralised).
  labelKey: {
    type: String,
    required: false,
    default: "",
  },
  // Path the "view more" link routes to (the sub-category landing page).
  viewMore: {
    type: String,
    required: false,
    default: "",
  },
})

const total = computed(() => $rootStore.results[props.type]?.total ?? 0)

const label = computed(() =>
  props.labelKey
    ? t(props.labelKey)
    : capitalize(t("items." + props.type, 2)),
)
</script>

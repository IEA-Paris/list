<template>
  <div>
    <div class="d-flex align-center">
      <v-text-field
        ref="textFieldRef"
        :id="`global-search-input-${type}`"
        v-model.trim="search"
        :placeholder="placeholderText"
        single-line
        class="transition-swing flex-grow-1"
        variant="outlined"
        hide-details
        clearable
        tile
        type="search"
        :loading="rootStore.loading"
        @keyup.enter="navigateToSearch"
        @click:append="navigateToSearch"
      >
        <template v-if="!search" #label>
          <div class="searchLabel">
            {{ placeholderText }}
          </div>
        </template>
      </v-text-field>
      <v-btn
        :rounded="0"
        variant="outlined"
        size="large"
        height="56"
        :aria-label="$t('click-here-to-search')"
        @keyup.enter="navigateToSearch"
        @click="navigateToSearch"
      >
        <v-icon size="large">mdi-magnify</v-icon>
        <v-tooltip activator="parent" location="start">{{
          $t("click-here-to-search")
        }}</v-tooltip>
      </v-btn>
    </div>

    <!-- Disciplines filter: full-width, available on every breakpoint. -->
    <v-autocomplete
      v-if="disciplineOptions.length"
      :model-value="disciplines"
      :items="disciplineOptions"
      item-title="title"
      item-value="value"
      :label="$t('search.filter-by-discipline')"
      :placeholder="$t('search.disciplines')"
      variant="outlined"
      density="comfortable"
      tile
      multiple
      chips
      closable-chips
      clearable
      hide-details
      class="mt-3"
      prepend-inner-icon="mdi-filter-variant"
      @update:model-value="onDisciplinesChange"
    />
  </div>
</template>

<script setup>
import { useDebounceFn } from "@vueuse/core"
import { useRootStore } from "../../../stores/root"
import { useDisplay } from "vuetify"
import {
  computed,
  useI18n,
  ref,
  useLocalePath,
  useRoute,
  useRouter,
  navigateTo,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "#imports"
const { mdAndUp } = useDisplay()
const localePath = useLocalePath()
const { locale, t } = useI18n()
const rootStore = useRootStore()
const route = useRoute()
const routeName = computed(() => route.name?.toString() ?? "")
const emit = defineEmits(["disciplines-change"])

// Rotating placeholder examples (only used for the global "all" search).
// Examples live in i18n; keys may be absent in some locales — we filter those.
const EXAMPLE_COUNT = 4
const ROTATE_MS = 3000
const exampleIndex = ref(0)
const exampleKeys = computed(() => {
  const keys = []
  for (let i = 1; i <= EXAMPLE_COUNT; i++) keys.push(`search.example.${i}`)
  return keys
})
const exampleTexts = computed(() =>
  exampleKeys.value
    .map((k) => t(k))
    .filter((s) => s && !s.startsWith("search.example.")),
)

let rotateTimer = null
const startRotation = () => {
  if (rotateTimer || exampleTexts.value.length <= 1) return
  if (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  )
    return
  rotateTimer = setInterval(() => {
    exampleIndex.value = (exampleIndex.value + 1) % exampleTexts.value.length
  }, ROTATE_MS)
}
const stopRotation = () => {
  if (rotateTimer) clearInterval(rotateTimer)
  rotateTimer = null
}
onMounted(startRotation)
onBeforeUnmount(stopRotation)

const placeholderText = computed(() => {
  // On the dedicated /search page we want a more explicit instruction.
  if (routeName.value.startsWith("search")) {
    return mdAndUp.value
      ? t("type-a-search-term-to-find-results-across-all-categories")
      : t("search")
  }
  // Per-type search inputs keep their existing scoped placeholder.
  if (props.type !== "all") {
    return t("list.search-type", [t("items." + props.type, 2)])
  }
  // Global search: rotate through example queries to teach what's searchable.
  const examples = exampleTexts.value
  if (examples.length === 0) return t("search")
  return t("search.try", [examples[exampleIndex.value % examples.length]])
})
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  // Selected discipline slugs (global search only).
  disciplines: {
    type: Array,
    default: () => [],
  },
  // Available discipline options: [{ value, title }].
  disciplineOptions: {
    type: Array,
    default: () => [],
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
})

onMounted(() => {
  if (!props.autofocus) return
  // Wait one tick so the v-text-field has rendered before reaching into it.
  nextTick(() => {
    const input = textFieldRef.value?.$el?.querySelector?.("input")
    input?.focus()
  })
})

const onDisciplinesChange = (next) => {
  emit("disciplines-change", Array.isArray(next) ? next : [])
}

const textFieldRef = ref(null)

const navigateToSearch = () => {
  const term = (
    textFieldRef.value?.$el?.querySelector("input")?.value ??
    rootStore.search ??
    ""
  ).trim()
  rootStore.search = term
  navigateTo({
    path: localePath("/search"),
    query: term ? { search: term } : {},
  })
}

const search = computed({
  get() {
    return rootStore.search
  },
  // 600ms matches a comfortable typing rhythm and is long enough that the
  // GraphQL query doesn't fire mid-word. Passing writeUrl:false keeps the
  // URL stable during typing — the URL is committed by navigateToSearch on
  // submit (Enter / magnifier).
  set: useDebounceFn(function (v) {
    const value = v || ""
    if (!value && !rootStore.search) return

    rootStore.updateSearch({
      type: props.type,
      search: value,
      lang: locale.value,
      writeUrl: false,
    })
  }, 600),
})
</script>

<style lang="scss" scoped></style>

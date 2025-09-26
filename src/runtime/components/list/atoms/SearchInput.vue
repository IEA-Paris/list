<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-text-field
      v-model.trim="search"
      :id="inputId"
      :placeholder="$t('list.search-type', [$t('items.' + type, 2)])"
      :append-icon="type === 'all' ? 'mdi-magnify' : ''"
      prepend-inner-icon="mdi-magnify"
      single-line
      class="transition-swing"
      variant="outlined"
      hide-details
      clearable
      tile
      type="search"
      :loading="isLoading"
    >
      <!--    :loading="$nuxt.loading || $store.state.loading" :class="{ 'mt-3':
      $store.state.scrolled }" -->
      <template v-if="!search" #label>
        <div class="searchLabel">
          {{
            type === "all"
              ? $t("search")
              : $t("list.search-type", [$t("items." + type, 2)])
          }}
        </div>
      </template>
    </v-text-field>
  </div>
</template>

<script setup>
import { useDebounceFn } from "@vueuse/core"
import { useRootStore } from "../../../stores/root"
import { computed, useI18n, useNuxtApp } from "#imports"
const { $stores } = useNuxtApp()

const { locale } = useI18n()
const rootStore = useRootStore()
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    required: false,
    default: "",
  },
})
const inputId = computed(() => props.id || `search-input-${props.type}`)
const search = computed({
  get() {
    return props.type === "all"
      ? rootStore.search
      : $stores[props.type]?.search || ""
  },
  set: useDebounceFn(async (v) => {
    await rootStore.updateSearch({
      type: props.type,
      search: v || "",
      lang: locale.value,
    })
  }, 300),
})

const isLoading = computed(() =>
  props.type === "all"
    ? rootStore.loading
    : Boolean($stores[props.type]?.loading),
)
</script>

<style lang="scss" scoped></style>

<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-text-field
      v-model.trim="search"
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
      :loading="rootStore.loading"
      @keyup.enter="type === 'all' ? $router.push(localePath('/search')) : null"
      @click:append="
        type === 'all' ? $router.push(localePath('/search')) : null
      "
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
import { computed, useI18n } from "#imports"
const { $router } = useNuxtApp()
const localePath = useLocalePath()

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
})
const search = computed({
  get() {
    return rootStore.search
  },
  set: await useDebounceFn(async function (v) {
    await rootStore.updateSearch({
      type: props.type,
      search: v || "",
      lang: locale.value,
    })
  }, 300),
})
</script>

<style lang="scss" scoped></style>

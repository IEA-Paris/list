<template>
  <v-menu :disabled="rootStore.loading">
    <template #activator="{ props: menu }">
      <v-tooltip location="top">
        <template #activator="{ props: tooltip }">
          <span
            class="d-inline-flex align-center"
            :class="{ 'mt-3': isXsDisplay }"
            v-bind="mergeProps(menu, tooltip)"
          >
            <v-skeleton-loader
              v-if="rootStore.loading"
              type="button"
              width="60"
              height="60"
            />
            <v-btn v-else icon variant="text">
              <v-icon>mdi-{{ currentSort?.icon || defaultSort?.icon }}</v-icon>
            </v-btn>
          </span>
        </template>

        <div
          v-html="
            $t('list.sort-mode') +
            $t('list.' + (currentSort?.text || defaultSort?.text))
          "
        />
      </v-tooltip>
    </template>

    <v-list density="compact">
      <v-list-item
        v-for="(item, key) in $stores[type].sort"
        :key="key"
        :disabled="rootStore.loading || isActiveSort(key)"
        :active="isActiveSort(key)"
        active-class="bg-black text-white"
        @click="onSelectSort(key)"
      >
        <template #prepend>
          <v-icon>mdi-{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title>{{ $t("list." + item.text) }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { computed } from "vue"
import { mergeProps } from "vue"
import { useDisplay } from "vuetify"
import { useRootStore } from "../../../stores/root"
import { useNuxtApp, useI18n } from "#imports"

const { $stores } = useNuxtApp()
const { xs: isXsDisplay } = useDisplay()
const { locale } = useI18n()
const rootStore = useRootStore()

const props = defineProps({
  type: { type: String, default: "articles", required: true },
})

const sortObj = computed(() => $stores[props.type]?.sort || {})

const defaultSortKey = computed(() => {
  const keys = Object.keys(sortObj.value)
  return keys.find((k) => sortObj.value[k]?.default) || keys[0]
})

const activeSortKey = computed(() => {
  const keys = Object.keys(sortObj.value)
  return keys.find((k) => sortObj.value[k]?.active) || defaultSortKey.value
})

const defaultSort = computed(() =>
  defaultSortKey.value ? sortObj.value[defaultSortKey.value] : undefined,
)

const currentSort = computed(() =>
  activeSortKey.value ? sortObj.value[activeSortKey.value] : defaultSort.value,
)

const isActiveSort = (key) => activeSortKey.value === key

const onSelectSort = async (key) => {
  setActiveSort(key)
  console.log("key", key)

  const item = sortObj.value[key]
  if (!item?.value) return

  rootStore.updateSort({
    value: item.value,
    type: props.type,
    lang: locale.value,
    sortKey: key,
  })
}

const setActiveSort = (activeKey) => {
  for (const k of Object.keys(sortObj.value)) {
    sortObj.value[k].active = k === activeKey
  }
}
</script>

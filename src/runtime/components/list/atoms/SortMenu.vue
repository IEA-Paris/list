<template>
  <v-menu :disabled="$stores[type].loading">
    <template #activator="{ props: menu }">
      <v-tooltip location="top">
        <template #activator="{ props: tooltip }">
          <template v-if="$stores[type].loading">
            <v-skeleton-loader type="button" :class="{ 'mt-3': isXsDisplay }" />
          </template>

          <template v-else>
            <v-btn
              x-large
              outlined
              tile
              flat
              icon
              :class="{ 'mt-3': isXsDisplay }"
              v-bind="mergeProps(menu, tooltip)"
            >
              <v-icon>mdi-{{ $stores[type].sort[currentSort]?.icon }}</v-icon>
            </v-btn>
          </template>
        </template>

        <div
          v-html="
            $t('list.sort-mode') +
            $t('list.' + $stores[type].sort[currentSort]?.text)
          "
        />
      </v-tooltip>
    </template>

    <v-list density="compact">
      <v-list-item
        v-for="(item, key) in $stores[type].sort"
        :key="key"
        :disabled="$stores[type].loading || key === currentSort"
        :active="key === currentSort"
        active-class="bg-black text-white"
        @click="
          rootStore.updateSort({
            type: type,
            sort: key,
          })
        "
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

const currentSort = computed(() =>
  $stores[props.type]?.currentSort
    ? $stores[props.type]?.currentSort
    : Object.keys($stores[props.type]?.sort).find(
        (k) => $stores[props.type].sort[k]?.default,
      ),
)
</script>

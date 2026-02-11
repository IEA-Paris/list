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
              <v-icon>mdi-{{ $stores[type].sort[currentSort]?.icon }}</v-icon>
            </v-btn>
          </span>
        </template>

        <div
          v-html="
            $t('list.sort-mode') +
            $t('list.' + $stores[type].sort[currentSort]?.text)
          "
        />
      </v-tooltip>
    </template>

    <<v-list density="compact">
      <v-list-item
        v-for="(item, key) in $stores[type].sort"
        :key="key"
        :disabled="$stores[type].loading || key === currentSort"
        :active="key === currentSort"
        active-class="list-item-active"
        @click="
          rootStore.updateSort({
            type: type,
            sortKey: key,
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
import { useNuxtApp } from "#imports"

const { $stores } = useNuxtApp()
const { xs: isXsDisplay } = useDisplay()
const rootStore = useRootStore()

const props = defineProps({
  type: { type: String, default: "articles", required: true },
})

const currentSort = computed(
  () =>
    $stores[props.type]?.sortKey ||
    Object.keys($stores[props.type]?.sort).find(
      (k) => $stores[props.type].sort[k]?.default,
    ),
)
</script>

<style>
.list-item-active {
  background-color: black !important;
  color: white !important;
}

.list-item-active .v-list-item__overlay {
  opacity: 0 !important;
}
</style>

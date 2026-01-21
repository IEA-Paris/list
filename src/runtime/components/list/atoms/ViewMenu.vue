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
            <v-btn v-else x-large tile flat :icon="'mdi-' + currentView.icon" />
          </span>
        </template>

        <div v-html="$t('list.view-mode') + $t('list.' + currentView.name)" />
      </v-tooltip>
    </template>

    <v-list density="compact">
      <v-list-item
        v-for="(value, key, index) in items"
        :key="index"
        :disabled="
          $stores[type].loading || (value.name || key) === currentView.name
        "
        :active="(value.name || key) === currentView.name"
        active-class="list-item-active"
        @click="updateView(value.name || key)"
      >
        <template #prepend>
          <v-icon>mdi-{{ value.icon }}</v-icon>
        </template>

        <v-list-item-title>
          {{ $t("list." + (value.name || key)) }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script setup>
import { mergeProps } from "vue"
import { useDisplay } from "vuetify"
import { useRootStore } from "../../../stores/root"
import { useNuxtApp, useI18n, computed } from "#imports"

const { locale } = useI18n()
const { $stores } = useNuxtApp()
const rootStore = useRootStore()
const { xs: isXsDisplay } = useDisplay()

const props = defineProps({
  type: {
    type: String,
    default: "articles",
    required: true,
  },
})

const items = computed(() => $stores[props.type]?.views ?? {})

const currentView = computed(() => {
  const store = $stores[props.type]
  if (store?.view) return store.view

  const views = store?.views ?? {}
  const defaultKey = Object.keys(views).find((k) => views[k]?.default)
  return defaultKey ? views[defaultKey] : { name: "list", icon: "view-list" }
})

const updateView = (value) => {
  rootStore.updateView({ value, type: props.type, lang: locale.value })
}
</script>

<style lang="scss">
.list-item-active {
  background-color: black !important;
  color: white !important;
}

.list-item-active .v-list-item__overlay {
  opacity: 0 !important;
}
</style>

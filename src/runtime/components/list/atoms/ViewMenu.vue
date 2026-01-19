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
              tile
              flat
              :icon="'mdi-' + currentIcon"
              :class="{ 'mt-3': isXsDisplay }"
              v-bind="mergeProps(menu, tooltip)"
            />
          </template>
        </template>
        <div v-html="$t('list.view-mode') + $t('list.' + currentName)" />
      </v-tooltip>
    </template>
    <v-list density="compact">
      <v-list-item
        v-for="(value, key, index) in items"
        :key="index"
        :disabled="$stores[type].loading || (value.name || key) === currentName"
        :active="(value.name || key) === currentName"
        active-class="bg-black text-white"
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
import { useNuxtApp, ref, useI18n, computed } from "#imports"
const { locale } = useI18n()
const { $stores } = useNuxtApp()

const props = defineProps({
  type: {
    type: String,
    default: "articles",
    required: true,
  },
})
const { xs: isXsDisplay } = useDisplay()

const rootStore = useRootStore()

const store = computed(() => $stores[props.type])

const items = computed(() => store.value?.views ?? {})

const current = computed(() => store.value?.view ?? null)

console.log("current", current.value)
const defaultView = computed(() => {
  const views = store.value?.views ?? {}
  const key = Object.keys(views).find((k) => views[k]?.default === true)
  return key ? views[key] : { name: "list", icon: "view-list" }
})

const currentIcon = computed(
  () => current.value?.icon ?? defaultView.value.icon,
)
const currentName = computed(
  () => current.value?.name ?? defaultView.value.name,
)

const updateView = async (value) => {
  rootStore.updateView({ value, type: props.type, lang: locale.value })
}
</script>

<style lang="scss"></style>

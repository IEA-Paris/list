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
              :icon="'mdi-' + (current?.icon || defaultView?.icon)"
              :class="{ 'mt-3': isXsDisplay }"
              v-bind="mergeProps(menu, tooltip)"
            />
          </template>
        </template>
        <div
          v-html="
            $t('list.view-mode') +
            $t('list.' + (current?.name || defaultView?.name))
          "
        />
      </v-tooltip>
    </template>
    <v-list density="compact">
      <v-list-item
        v-for="(value, key, index) in items"
        :key="index"
        :disabled="$stores[type].loading"
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
const items = ref($stores[props.type].views)

const current = ref($stores[props.type].view)

const defaultView = ref(
  $stores[props.type].views[
    Object.keys($stores[props.type].views).find(
      (k) => $stores[props.type].views[k]?.default === true,
    )
  ] || { name: "list", icon: "view-list" },
)

const updateView = async (value) => {
  rootStore.updateView({ value, type: props.type, lang: locale.value })
}
</script>

<style lang="scss"></style>

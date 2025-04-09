<template>
  <v-menu>
    <template #activator="{ props: menu }">
      <v-tooltip location="top">
        <template #activator="{ props: tooltip }">
          <v-btn
            x-large
            tile
            flat
            :icon="'mdi-' + current?.icon || defaultView?.icon"
            :class="{
              'mt-3': isXsDisplay,
            }"
            v-bind="mergeProps(menu, tooltip)"
          />
        </template>
        <div
          v-html="
            $t('list.view-mode') +
            $t('list.' + current.name || defaultView.name)
          "
        />
      </v-tooltip>
    </template>
    <v-list density="compact">
      <v-list-item
        v-for="(value, key, index) in items"
        :key="index"
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
import { mergeProps, ref } from "vue";
import { useDisplay } from "vuetify";
import { useRootStore } from "../../../stores/root";
import { useNuxtApp } from "#imports";

const { $stores } = useNuxtApp();

const props = defineProps({
  type: {
    type: String,
    default: "articles",
    required: true,
  },
});
const { xs: isXsDisplay } = useDisplay();

const rootStore = useRootStore();
const items = ref($stores[props.type].views);

const current = ref($stores[props.type].view);

const updateView = async (value) => {
  await rootStore.updateView({ value, type: props.type });
};
</script>

<style lang="scss"></style>

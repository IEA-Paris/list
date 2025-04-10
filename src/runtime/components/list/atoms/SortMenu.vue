<template>
  <v-menu>
    <template #activator="{ props: menu }">
      <v-tooltip location="top">
        <template #activator="{ props: tooltip }">
          <v-btn
            x-large
            outlined
            tile
            flat
            icon
            :class="{
              'mt-3': isXsDisplay,
            }"
            v-bind="mergeProps(menu, tooltip)"
          >
            <v-icon>mdi-{{ current?.icon || defaultSort?.icon }}</v-icon>
          </v-btn>
        </template>
        <div
          v-html="
            $t('list.sort-mode') +
            $t('list.' + current.text || defaultSort.text)
          "
        />
      </v-tooltip>
    </template>
    <v-list density="compact">
      <template v-for="(item, index) in items">
        <v-list-item
          v-if="item.text !== current.text"
          :key="index"
          @click="updateSort(item.value)"
        >
          <template #prepend>
            <v-icon>mdi-{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ $t("list." + item.text) }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script setup>
import { mergeProps } from "vue";
import { useDisplay } from "vuetify";
import { useRootStore } from "../../../stores/root";
import { useNuxtApp, computed, ref } from "#imports";

const { $stores } = useNuxtApp();
const { xs: isXsDisplay } = useDisplay();

const rootStore = useRootStore();

const props = defineProps({
  type: {
    type: String,
    default: "articles",
    required: true,
  },
});
const items = ref($stores[props.type].sort);
const defaultSort = ref(
  $stores[props.type].sort[
    Object.keys($stores[props.type].sort).find(
      (item) => $stores[props.type].sort[item].default === true
    )
  ]
);

const current = computed(() => {
  try {
    return $stores[props.type].sort[
      Object.keys($stores[props.type].sort).find((item) => {
        return (
          $stores[props.type].sort[item].value[0] ===
            $stores[props.type].sortBy[0] &&
          $stores[props.type].sort[item].value[1] ===
            $stores[props.type].sortDesc[0]
        );
      })
    ];
  } catch (error) {
    console.log("error: ", error);
    return items[Object.keys(items).find((item) => item.default)];
  }
});

const updateSort = async (value) => {
  await rootStore.updateSort({ value, type: props.type });
};
</script>

<style lang="scss"></style>

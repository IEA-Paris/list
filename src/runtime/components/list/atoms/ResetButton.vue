<template>
  <v-tooltip location="top">
    <template #activator="{ props: tooltip }">
      <v-btn
        x-large
        outlined
        tile
        flat
        icon
        class="ml-auto"
        v-bind="tooltip"
        @click="
          () => {
            rootStore.resetState(type);
            rootStore.update(type);
          }
        "
      >
        <v-icon>mdi-restore</v-icon>
      </v-btn>
    </template>
    <span>{{ $t("list.reset-filters") }}</span>
  </v-tooltip>
</template>
<script setup>
import { useNuxtApp, onMounted } from "#imports";
import { useRootStore } from "../../../stores/root";
const { $stores } = useNuxtApp();
const rootStore = useRootStore();

const props = defineProps({
  type: {
    type: String,
    default: "articles",
    required: true,
  },
});
onMounted(() => {
  console.log("store module", $stores[props.type]);
});
</script>
<style lang="scss"></style>

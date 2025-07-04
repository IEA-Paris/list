<template>
  <div class="perpage-select" :class="smAndDown ? 'text-center' : ''">
    <span class="grey--text pr-3" :class="{ 'ml-6': !scrolled }">{{
      $t("items-per-page")
    }}</span>
  </div>
  <v-select
    v-model="itemsPerPage"
    class="perPageSelect"
    density="compact"
    variant="outlined"
    :items="itemsPerPageArray"
    hide-details
  />
</template>

<script setup>
import { useNuxtApp } from "#imports";
import { useDisplay } from "vuetify";
import { computed, ref } from "vue";
const { smAndDown } = useDisplay();
const { $stores } = useNuxtApp();

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: "",
  },
});

const itemsPerPage = ref($stores[props.type].itemsPerPage);
const itemsPerPageArray = computed(() => $stores[props.type].itemsPerPageArray);
const scrolled = computed(() => $stores.scrolled);
</script>

<style></style>

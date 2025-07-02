<template>
  <v-select
    v-model="itemsPerPage"
    class="perPageSelect"
    density="compact"
    variant="outlined"
    :items="itemsPerPageArray"
    hide-details
    :loading="$rootStore.loading"
    @update:model-value="
      $rootStore.updateItemsPerPage({
        value: $event,
        type: type,
        lang: locale,
      })
    "
  />
</template>

<script setup>
import { useNuxtApp, useI18n } from "#imports"
import { useDisplay } from "vuetify"
import { computed, ref } from "vue"
const { smAndDown } = useDisplay()
const { $stores, $rootStore } = useNuxtApp()

const { locale } = useI18n()
const props = defineProps({
  type: {
    type: String,
    required: false,
    default: "",
  },
})

const itemsPerPage = ref($stores[props.type].itemsPerPage)
const itemsPerPageArray = computed(
  () => $stores[props.type].view.perPage.options,
)
const scrolled = computed(() => $stores.scrolled)
</script>

<style></style>

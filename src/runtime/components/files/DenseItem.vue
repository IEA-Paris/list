<template>
  <v-row class="my-2 highlight-on-hover" no-gutters>
    <v-col cols="12" class="px-4">
      <v-skeleton-loader v-if="isLoading" type="avatar, text@6" />
      <template v-else>
        <div class="text-h6">{{ item.name || item.filename }}</div>
        <div v-if="item.description" class="text-body-2 mt-1">
          <MDC :value="item.description" />
        </div>
      </template>
    </v-col>
  </v-row>
  <v-divider />
</template>

<script setup>
import { computed } from "#imports"
import { useRootStore } from "../../stores/root"

const rootStore = useRootStore()
const props = defineProps({
  item: { type: Object, required: true },
  loading: { type: Boolean, default: false },
})

const isLoading = computed(() => rootStore.loading || props.loading)
</script>

<style></style>

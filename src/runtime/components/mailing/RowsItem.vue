<template>
  <v-row
    class="highlight-on-hover pa-3"
    no-gutters
    @click="$router.push(pathPrefix)"
  >
    <v-col cols="12" class="px-6">
      <v-skeleton-loader v-if="isLoading" type="heading, text@8, button" />
      <template v-else>
        <div class="text-h5">{{ item.name }}</div>
        <div v-if="item.summary" class="mt-2">
          <MDC :value="item.summary" />
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

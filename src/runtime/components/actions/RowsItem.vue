<template>
  <v-row class="highlight-on-hover pa-3" no-gutters>
    <v-col v-if="mdAndUp" cols="12" md="3">
      <MiscAtomsImageContainer
        cover
        :src="imageSrc"
        :ratio="1 / 1"
        :loading="isLoading"
      />
    </v-col>
    <v-col cols="12" :md="mdAndUp ? 9 : 12" class="px-6">
      <v-skeleton-loader
        v-if="isLoading"
        :type="
          [
            'heading, ossein, text@6, button',
            'heading, ossein, text@6, button',
            'heading, ossein, text@4, button',
            'heading, ossein, text@4, button',
            'heading, ossein, text@4, button',
            'heading, ossein, text@4, button',
          ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
        "
      />
      <template v-else>
        <div class="text-h5 text-wrap">{{ item.name }}</div>
        <div v-if="item.summary" class="mt-2">
          <MDC :value="item.summary" />
        </div>
      </template>
    </v-col>
  </v-row>
  <v-divider />
</template>

<script setup>
import { useDisplay } from "vuetify"
import { computed } from "#imports"
import { useRootStore } from "../../stores/root"

const { name, mdAndUp } = useDisplay()
const rootStore = useRootStore()
const props = defineProps({
  item: { type: Object, required: true },
  index: { type: Number, required: false, default: 0 },
  loading: { type: Boolean, required: false, default: false },
})

const isLoading = computed(() => rootStore.loading || props.loading)
const imageSrc = computed(() => {
  const img = props.item && props.item.image
  if (!img) return "/default.png"
  if (typeof img === "string") return img
  if (img && img.url) return img
  return "/default.png"
})
</script>

<style></style>

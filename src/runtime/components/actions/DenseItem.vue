<template>
  <v-row class="my-2 highlight-on-hover" no-gutters>
    <v-col v-if="mdAndUp" cols="12" md="2">
      <MiscAtomsImageContainer :loading :src="imageSrc" :ratio="1 / 1" cover />
    </v-col>
    <v-col cols="12" :md="mdAndUp ? 10 : 12" class="px-4">
      <v-skeleton-loader
        v-if="loading"
        :type="
          [
            'heading, subtitle, text@6',
            'heading, subtitle, text@6',
            'heading, subtitle, text@4',
            'heading, subtitle, text@4',
            'heading, subtitle, text@4',
            'heading, subtitle, text@4',
          ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
        "
      />
      <template v-else>
        <div class="text-h5">{{ item.name }}</div>
        <div v-if="item.summary" class="text-body-1 mt-2">
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

const { name, mdAndUp } = useDisplay()
const props = defineProps({
  item: { type: Object, required: true },
  index: { type: Number, required: false, default: 0 },
  loading: { type: Boolean, required: false, default: false },
})

const imageSrc = computed(() => {
  const img = props.item && props.item.image
  if (!img) return "/default.png"
  if (typeof img === "string") return img
  if (img && img.url) return img
  return "/default.png"
})
</script>

<style></style>

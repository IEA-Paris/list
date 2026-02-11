<template>
  <v-card flat class="pa-4">
    <v-skeleton-loader v-if="loading" type="heading, text@10" />
    <template v-else>
      <div class="text-h4 mb-2">{{ item.name }}</div>
      <MDC v-if="item.description" :value="item.description" />
    </template>
  </v-card>
</template>

<script setup>
const props = defineProps({
  item: { type: Object, required: true },
  loading: { type: Boolean, default: false },
})
</script>

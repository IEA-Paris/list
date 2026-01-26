<template>
  <v-row class="highlight-on-hover pa-3" no-gutters>
    <v-col cols="12" class="px-6">
      <v-skeleton-loader v-if="loading" type="heading, text@6" />
      <template v-else>
        <div class="text-h6">{{ item.name }}</div>
      </template>
    </v-col>
  </v-row>
  <v-divider />
</template>

<script setup>
const props = defineProps({
  item: { type: Object, required: true },
  loading: { type: Boolean, default: false },
})
</script>

<style></style>

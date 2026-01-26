<template>
  <v-row class="my-2 highlight-on-hover" no-gutters>
    <v-col cols="12" class="px-4">
      <v-skeleton-loader v-if="loading" type="heading, text@6" />
      <template v-else>
        <div class="text-h5">{{ item.name }}</div>
        <div v-if="item.summary" class="text-body-1 mt-1">
          <MDC :value="item.summary" />
        </div>
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

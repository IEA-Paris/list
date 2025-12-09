<template>
  <v-row no-gutters>
    {{ item }}
  </v-row>
  <v-divider />
</template>

<script setup>
defineProps({
  loading: { type: Boolean, default: false },
  item: { type: Object, required: true },
})
</script>

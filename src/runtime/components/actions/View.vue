<template>
  <v-row no-gutters>
    <slot />
  </v-row>
  <v-divider />
</template>

<script setup>
defineProps({ loading: { type: Boolean, default: false } })
</script>

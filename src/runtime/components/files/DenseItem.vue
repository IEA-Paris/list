<template>
  {{ item }}
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },

  pathPrefix: {
    type: String,
    required: true,
  },
})
</script>

<style></style>

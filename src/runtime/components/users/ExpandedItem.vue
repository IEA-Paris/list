<template>
  <div>
    {{ item }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
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

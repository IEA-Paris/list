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
})
</script>

<style></style>

<template>
  <span class="d-flex flex-row flex-wrap" v-bind="attrs">
    <div v-for="(tag, index) in items" :key="tag + index" class="">
      <v-chip size="small" class="mr-2 mt-2" variant="outlined" label>{{
        tag
      }}</v-chip>
    </div>
  </span>
</template>

<script setup>
import { useAttrs } from "vue"
const attrs = useAttrs()
const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: [],
  },
})
</script>

<style lang="scss" scoped></style>

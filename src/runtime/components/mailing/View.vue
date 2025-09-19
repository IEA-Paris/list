<template>
  {{ item }}
</template>

<script setup>
import { useNuxtApp } from "#imports"

const { $stores } = useNuxtApp()
defineProps({
  item: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
})

$stores.mailing.loading = false
</script>

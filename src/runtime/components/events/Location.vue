<template>
  <div v-if="item?.location" class="text-overline font-weight-bold mt-md-4">
    {{ $t("location") }}
  </div>

  <div v-if="item?.location">
    <b>{{ item.location.name }}</b>

    <div v-if="formattedAddress">
      {{ formattedAddress }}
    </div>
  </div>

  <div v-if="item?.location?.details" class="text-caption">
    {{ item.location.details }}
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const formattedAddress = computed(() => {
  const loc = props.item?.location
  if (!loc) return ""

  const parts = [loc.street, loc.city].filter(Boolean)

  const zipCountry = [loc.zip, loc.country].filter(Boolean)

  if (zipCountry.length) {
    parts.push(`(${zipCountry.join(", ")})`)
  }

  return parts.join(", ")
})
</script>

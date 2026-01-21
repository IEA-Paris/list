<template>
  <div class="location-section">
    <div class="text-overline font-weight-bold mt-md-4">
      {{ $t("location") }}
    </div>

    <div>
      <b>{{ displayLocation.name }}</b>
      <div v-if="displayLocation.address" class="text-body-2">
        {{ displayLocation.address }}
      </div>
    </div>

    <div v-if="displayLocation.details" class="text-caption mt-1">
      {{ displayLocation.details }}
    </div>
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

const DEFAULT_LOCATION = {
  name: "Paris IAS",
  street: "17 Quai d'Anjou",
  city: "Paris",
  zip: "75004",
  country: "France",
}

const hasValidLocation = computed(() => {
  const loc = props.item?.location
  return loc && Object.keys(loc).length > 0
})

const formatAddress = (location) => {
  if (!location) return ""

  const parts = [location.street, location.city].filter(Boolean)
  const zipCountry = [location.zip, location.country].filter(Boolean)

  if (zipCountry.length) {
    parts.push(`(${zipCountry.join(", ")})`)
  }

  return parts.join(", ")
}

const displayLocation = computed(() => {
  if (hasValidLocation.value) {
    return {
      name: props.item.location.name,
      address: formatAddress(props.item.location),
      details: props.item.location.details,
    }
  }

  return {
    name: DEFAULT_LOCATION.name,
    address: formatAddress(DEFAULT_LOCATION),
    details: null,
  }
})
</script>

<style scoped></style>

<template>
  <div class="location-section">
    <div class="text-overline font-weight-bold mt-md-4">
      {{ $t("location") }}
    </div>
    <div>
      <b>{{ getDisplayLocation().name }}</b>
      <div v-if="getDisplayLocation().address" class="text-body-2">
        {{ getDisplayLocation().address }}
      </div>
    </div>
    <div v-if="getDisplayLocation().details" class="text-caption mt-1">
      {{ getDisplayLocation().details }}
    </div>
  </div>
</template>

<script setup>
import { useI18n, useAppConfig } from "#imports"

const { locale } = useI18n()
const appConfig = useAppConfig()

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const formatAddress = (location) => {
  if (!location) return ""
  if (location.address) return location.address

  const parts = [location.street, location.city].filter(Boolean)
  const zipCountry = [location.zip, location.country].filter(Boolean)
  if (zipCountry.length) {
    parts.push(`(${zipCountry.join(", ")})`)
  }
  return parts.join(", ")
}

const getDisplayLocation = () => {
  const loc = props.item?.location
  const hasValidLocation = loc && Object.keys(loc).length > 0

  if (hasValidLocation) {
    return {
      name: loc.name,
      address: formatAddress(loc),
      details: loc.details,
    }
  }

  const isFr = locale.value === "fr"
  return {
    name: isFr ? appConfig.short_name_french : appConfig.short_name_english,
    address: appConfig.address,
    details: appConfig.postcode_country,
  }
}
</script>

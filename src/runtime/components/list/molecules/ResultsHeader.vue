<template>
  <v-divider />
  <div class="d-flex align-center justify-space-between my-6">
    <div class="d-flex flex-column">
      <div class="text-h4">
        {{ capitalize($t("items." + props.type, 2)) }}
      </div>
      <div class="text-overline">
        {{
          feminine
            ? $t(
                "list.0-items-found-f",
                [
                  $stores[type].total,
                  $t("items." + props.type, $stores[type].total),
                ],
                $stores[type].total,
              )
            : $t(
                "list.0-items-found",
                [
                  $stores[type].total,
                  $t("items." + props.type, $stores[type].total),
                ],
                $stores[type].total,
              )
        }}
      </div>
    </div>
    <v-spacer />
    <v-btn
      class="ma-2"
      color="default"
      variant="outlined"
      rounded="0"
      :to="localePath(type === 'people' ? '/people' : '/activities/' + type)"
      @click="$emit('add')"
    >
      {{ $t("list.pls-x-more", [$stores[type].total]) }}
    </v-btn>
  </div>
</template>
<script setup>
import { useNuxtApp, useLocalePath } from "#imports"
const localePath = useLocalePath()

const { $stores } = useNuxtApp()
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  feminine: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>

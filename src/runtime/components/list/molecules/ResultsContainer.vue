<template>
  <div>
    <v-divider />
    <div class="d-flex align-center justify-space-between my-6">
      <v-btn
        variant="text"
        size="large"
        class=""
        @click="$emit('toggle', type)"
      >
        <v-icon size="large">{{
          open ? "mdi-chevron-down" : "mdi-chevron-right"
        }}</v-icon>
      </v-btn>
      <div
        class="d-flex flex-column cursor-pointer"
        @click="$emit('toggle', type)"
      >
        <div class="text-h4">
          {{ capitalize($t("items." + props.type, 2)) }}
        </div>
        <div class="text-overline">
          {{
            feminine
              ? $t(
                  "list.0-items-found-f",
                  [
                    $rootStore.results[type].total,
                    $t("items." + props.type, $rootStore.results[type].total),
                  ],
                  $rootStore.results[type].total,
                )
              : $t(
                  "list.0-items-found",
                  [
                    $rootStore.results[type].total,
                    $t("items." + props.type, $rootStore.results[type].total),
                  ],
                  $rootStore.results[type].total,
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
      >
        {{ $t("list.pls-x-more", [$rootStore.results[type].total]) }}
      </v-btn>
    </div>
    <slot />
  </div>
</template>
<script setup>
import { useNuxtApp, useLocalePath } from "#imports"
const localePath = useLocalePath()

const { $rootStore } = useNuxtApp()
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
  open: {
    type: Boolean,
    required: false,
    default: true,
  },
})
</script>

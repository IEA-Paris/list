<template>
  <div>
    <div class="d-flex align-center justify-space-between my-2">
      <v-btn
        variant="text"
        class="mr-2"
        @click="$emit('toggle', type)"
        :disabled="
          $rootStore.results[type] && $rootStore.results[type]?.total === 0
        "
      >
        <v-icon>{{ open ? "mdi-chevron-down" : "mdi-chevron-right" }}</v-icon>
      </v-btn>
      <div
        class="d-flex flex-column cursor-pointer"
        @click="$emit('toggle', type)"
      >
        <div
          class="text-h5 font-weight-medium"
          :class="
            $rootStore.results[type] && $rootStore.results[type].total > 0
              ? 'black'
              : 'text-grey darken-2'
          "
        >
          {{ capitalize($t("items." + props.type, 2)) }}
        </div>
        <div class="text-overline">
          {{
            feminine
              ? $t(
                  "list.0-items-found-f",
                  [
                    $rootStore.results[type] && $rootStore.results[type].total,
                    $t(
                      "items." + props.type,
                      $rootStore.results[type] &&
                        $rootStore.results[type].total,
                    ),
                  ],
                  $rootStore.results[type] && $rootStore.results[type].total,
                )
              : $t(
                  "list.0-items-found",
                  [
                    $rootStore.results[type] && $rootStore.results[type].total,
                    $t(
                      "items." + props.type,
                      $rootStore.results[type] &&
                        $rootStore.results[type].total,
                    ),
                  ],
                  $rootStore.results[type] && $rootStore.results[type].total,
                )
          }}
        </div>
      </div>
      <v-spacer />
      <v-btn
        color="default"
        variant="text"
        size="small"
        rounded="0"
        v-if="$rootStore.results[type] && $rootStore.results[type]?.total > 3"
        :to="
          localePath({
            path: type === 'people' ? '/people' : '/activities/' + type,
            query: { search: $rootStore.search },
          })
        "
      >
        {{
          $t(
            "list.pls-x-more",
            [$rootStore.results[type] && $rootStore.results[type].total - 3],
            $rootStore.results[type] && $rootStore.results[type].total - 3,
          )
        }}
      </v-btn>
    </div>
    <slot />
  </div>
  <v-divider></v-divider>
</template>
<script setup>
import { useNuxtApp, useLocalePath } from "#imports"
const localePath = useLocalePath()

// Utility function to capitalize first letter
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

const { $rootStore } = useNuxtApp()

defineEmits(["toggle"])

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

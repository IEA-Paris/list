<template>
  <v-row v-ripple no-gutters class="cursor-pointer highlight-on-hover my-2">
    <v-col cols="12" class="w-100">
      <div v-ripple class="border-thin pa-6">
        <template v-if="isLoading">
          <v-skeleton-loader type="chip@2" class="mb-2" />
          <v-skeleton-loader type="heading" width="70%" class="mt-4" />
          <v-skeleton-loader type="text@4" class="mt-2 w-100" />

          <v-skeleton-loader type="chip" class="mt-4" width="260" />
        </template>

        <template v-else>
          <FellowshipsBadges :item :loading="isLoading" />

          <div class="text-h4 text-black text-wrap mt-4 pb-4">
            {{ item.name }}
          </div>

          <div
            v-if="item.summary"
            class="text-wrap clamped-text d-flex"
            :style="
              '-webkit-line-clamp:' +
              [5, 5, 4, 8, 10, 11][
                ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
              ]
            "
          >
            <MDC :value="item.summary" />
          </div>

          <MiscMoleculesChipContainer
            :items="[
              $t(
                'list.filters.fellowships.fellowshipType.' +
                  item.fellowshipType,
              ),
              ...(item?.disciplines?.length
                ? item.disciplines.map((d) => d.name)
                : []),
            ]"
            class="mt-4"
          />
        </template>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { computed } from "#imports"
import { useRootStore } from "../../stores/root"

const { name } = useDisplay()

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },

  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const rootStore = useRootStore()
const isLoading = computed(() => rootStore.loading || props.loading)
</script>

<style lang="scss"></style>

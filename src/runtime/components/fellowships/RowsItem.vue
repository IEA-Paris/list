<template>
  <v-row v-ripple no-gutters class="cursor-pointer highlight-on-hover my-2">
    <v-col cols="12" class="highlight-on-hover w-100">
      <div v-ripple class="border-thin pa-6">
        <FellowshipsBadges :item />
        <div class="d-flex">
          <v-skeleton-loader v-if="isLoading" type="heading" />
          <div v-else class="text-h4 text-black text-wrap mt-4 pb-4">
            {{ item.name }}
          </div>
        </div>
        <div
          class="text-wrap clamped-text d-flex"
          :style="
            '-webkit-line-clamp:' +
            [5, 5, 5, 10, 12, 14][
              ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
            ]
          "
        >
          <v-skeleton-loader v-if="isLoading" type="text@4" />
          <MDC v-else-if="item.description" :value="item.description" />
        </div>
        <v-skeleton-loader v-if="isLoading" type="chip@3" class="mt-2" />
        <MiscMoleculesChipContainer
          v-else
          :items="[
            $t(
              'list.filters.fellowships.fellowshipType.' + item.fellowshipType,
            ),
            ...(props.item && props.item.disciplines
              ? props.item.disciplines.map((discipline) => discipline.name)
              : []),
          ]"
          class="mt-2"
        />
      </div> </v-col
  ></v-row>
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

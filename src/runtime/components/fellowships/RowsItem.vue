<template>
  <v-col cols="12" md="6" class="highlight-on-hover">
    <div v-ripple class="border-thin pa-6">
      <FellowshipsBadges :item="item" />
      <div class="d-flex">
        <nuxt-link
          :to="
            localePath({
              name: 'activities-fellowships-slug',
              params: { slug: item.slug[locale] },
            })
          "
          class="text-h4 text-black text-wrap mt-4 pb-4"
        >
          {{ item.name }}
        </nuxt-link>
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
        <MDC v-if="item.description" :value="item.description" />
      </div>
      <MiscMoleculesChipContainer
        :items="[
          $t('list.filters.fellowships.fellowshipType.' + item.fellowshipType),
          ...(props.item && props.item.disciplines
            ? props.item.disciplines.map((discipline) => discipline.name)
            : []),
        ]"
        class="mt-2"
      />
    </div>
  </v-col>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { useLocalePath, useI18n } from "#imports"

const { name } = useDisplay()
const localePath = useLocalePath()
const { locale } = useI18n()

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})

console.log("itemLocal", props.item.slug)
</script>

<style lang="scss"></style>

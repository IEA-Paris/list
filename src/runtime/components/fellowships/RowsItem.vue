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
      <div class="d-flex">
        <MDC
          v-if="item.description"
          :value="item.description"
          class="text-wrap clamped-text"
          :style="
            '-webkit-line-clamp:' +
            [5, 5, 5, 10, 12, 14][
              ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
            ]
          "
        />
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
import { useDisplay } from "vuetify";
import { useLocalePath } from "#imports";

const { name } = useDisplay();
const localePath = useLocalePath();
const { locale } = useI18n();

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss"></style>

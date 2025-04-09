<template>
  <v-row
    v-ripple
    class="cursor-pointer highlight-on-hover"
    @click="
      $router.push(localePath('/activities/fellowships' + item.slug[locale]))
    "
  >
    <v-col align-self="center" cols="8" class="text-h6">
      {{ item.name }}
      <FellowshipsBadges :item="item" />
    </v-col>
    <v-col align-self="center" cols="4">
      <MiscMoleculesChipContainer
        :items="[
          $t('list.filters.fellowships.fellowshipType.' + item.fellowshipType),
          ...(props.item && props.item.disciplines
            ? props.item.disciplines.map((discipline) => discipline.name)
            : []),
        ]"
        class="mt-2"
    /></v-col>
  </v-row>
</template>
<script setup>
const { locale } = useI18n()

const localePath = useLocalePath()
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
</script>

<template>
  <div v-if="registrationStatus === 0" class="text-overline">
    {{
      $t("opening-applications-on-0", [getLocalizedDate(item.applicationStart)])
    }}
  </div>

  <FellowshipsRegisterModal
    v-else-if="registrationStatus === 1"
    :item="item"
    :view="view"
    class="mr-2"
  />

  <div v-else-if="registrationStatus === 2" class="my-2 text-overline">
    <v-icon class="text-grey" size="x-large"> mdi-circle-medium </v-icon>
    {{
      $t("applications-closed-since-0", [
        getLocalizedDate(item.applicationStop),
      ])
    }}
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  item: { type: Object, required: true },
  view: { type: Boolean, required: false, default: false },
});

const registrationStatus = computed(() => {
  const currentDate = new Date();
  const startDate = new Date(props.item.applicationStart);
  const endDate = new Date(props.item.applicationStop);
  switch (true) {
    case currentDate < startDate:
      return 0;
    case currentDate > startDate && currentDate < endDate:
      return 1;
    case currentDate > startDate && currentDate > endDate:
      return 2;
    default:
      return false;
  }
});
</script>

<style lang="scss" scoped></style>

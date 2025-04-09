<template>
  <v-row
    v-ripple
    class="cursor-pointer highlight-on-hover"
    @click="$router.push(localePath('/activities/events/' + item.slug[locale]))"
  >
    <v-col align-self="center" cols="2">
      {{
        new Date(item.start).toLocaleDateString(locale, {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })
      }}
    </v-col>
    <v-col align-self="center" class="text-h6 dense">
      <div class="mt-2 text-h6 text-overline font-weight-black">
        {{ $t("list.filters.events.category." + item.category) }}
      </div>
      {{ item.name }}
    </v-col>
    <v-col align-self="center">
      <!--       <EventsBadges :item /> -->
    </v-col>
  </v-row>
</template>

<script setup>
import { useLocalePath, useI18n } from "#imports";

const { locale } = useI18n();
const localePath = useLocalePath();
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

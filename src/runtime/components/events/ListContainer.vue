<template>
  <v-sheet v-for="(event, i) in events" :key="i" flat class="ma-6">
    <v-row
      :value="event"
      style="cursor: pointer"
      @click="
        $router.push(localePath('/activities/events/' + event.slug[locale]))
      "
    >
      <v-col cols="3">
        <MiscAtomsDateStamp
          :loading="rootStore.events.loading"
          :date="[
            new Date(event.start),
            ...(event.stop ? [new Date(event.stop)] : []),
          ]"
        />
      </v-col>
      <v-col cols="9">
        <v-list-item-title class="text-h6 my-3">
          {{ event.title }}
        </v-list-item-title>
        <v-list-item-subtitle v-text="event.summary" />
        <v-chip v-if="event.online" class="mr-2 mt-3" color="primary">
          {{ $t("online") }}
        </v-chip>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup>
import { useRootStore } from "../../stores/root";
import { useI18n } from "#imports";

const { locale } = useI18n();

const rootStore = useRootStore();
const props = defineProps({
  events: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss"></style>

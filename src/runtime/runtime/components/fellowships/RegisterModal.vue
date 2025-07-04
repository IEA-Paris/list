<template>
  <v-dialog max-width="500">
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        tile
        :variant="view ? 'outlined' : 'text'"
        class="text-overline"
      >
        {{ $t("register-until-0", [getLocalizedDate(item.applicationStop)]) }}
      </v-btn>
    </template>

    <template #default="{ isActive }">
      <v-card :title="$t('fellowship-register')">
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn :text="$t('cancel')" @click="isActive.value = false" />
          <v-btn
            :text="$t('events.register-me')"
            @click="isActive.value = false"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { getLocalizedDate } from "../../composables/useUtils";

const props = defineProps({
  item: { type: Object, required: true },
  view: { type: Boolean, required: false, default: false },
});
</script>

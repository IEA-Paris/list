<template>
  <div>
    <EventsRegisterModal v-if="item.bookingState === 'OPEN'" :item="item" />
    <v-btn
      v-if="item.bookingState === 'FULL'"
      color="grey-lighten-3"
      flat
      rounded="0"
      prepend-icon="mdi-circle-medium"
      size="small"
      class="my-2"
    >
      <template #prepend>
        <v-icon size="large" color="danger" />
      </template>
      {{ $t("event-full") }}
    </v-btn>

    <v-divider v-if="smAndUp" vertical class="mx-3" />
    <v-btn
      v-if="item.stream && item.stream.length"
      color="grey-lighten-3"
      flat
      rounded="0"
      prepend-icon="mdi-television-play"
      size="small"
      class="my-xs-2"
      :to="prefixPath"
    >
      {{ $t("live-stream-available") }}
    </v-btn>

    <v-btn
      v-if="item.outside"
      color="grey-lighten-3"
      flat
      rounded="0"
      prepend-icon="mdi-location-exit"
      size="small"
      class="my-xs-2"
    >
      {{ $t("outside-event") }}
    </v-btn>

    <v-btn
      v-if="item.type === 'HYBRID'"
      color="grey-lighten-3"
      flat
      rounded="0"
      prepend-icon="mdi-cast-education"
      size="small"
      class="my-xs-2"
    >
      {{ $t("hybrid-event") }}
    </v-btn>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"

const { smAndUp } = useDisplay()
const props = defineProps({
  item: { type: Object, required: true },
  pathPrefix: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped></style>

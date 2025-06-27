<template>
  <div class="text-overline font-weight-bold">
    {{ $t("date-et-heure") }}
  </div>
  <div>
    <div>{{ startDay }}</div>
    <div>{{ $t("from-starttime-to-stoptime", [startTime, stopTime]) }}</div>
  </div>

  <div class="text-overline font-weight-bold mt-md-4">
    {{ $t("location") }}
  </div>
  <div>{{ item.location }}</div>

  <v-btn
    variant="text"
    class="ml-n4"
    size="small"
    :prepend-icon="
      open ? 'mdi-chevron-double-down' : 'mdi-chevron-double-right'
    "
    @click="open = !open"
  >
    {{ $t("show-on-map") }}
  </v-btn>
  <v-expand-transition>
    <v-responsive v-show="open" :aspect-ratio="1 / 1">
      <iframe
        title="openstreetmap"
        width="100%"
        height="100%"
        absolute
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        src="https://www.openstreetmap.org/export/embed.html?bbox=2.3413968033604786%2C48.84311283480419%2C2.3779606766514942%2C48.8594349634343&amp;layer=mapnik&amp;marker=48.851274564242196%2C2.359678740005961"
      /><br /><small
        ><a
          href="https:/www.openstreetmap.org/?mlat=48.85127&amp;mlon=2.35968#map=16/48.85127/2.35968"
          >Afficher une carte plus grande</a
        ></small
      >
      >
    </v-responsive>
  </v-expand-transition>
  <br />
  <v-btn
    variant="text"
    class="ml-n4"
    size="small"
    prepend-icon="mdi-open-in-new"
  >
    {{ $t("details") }}
  </v-btn>
</template>

<script setup>
import { ref } from "vue"
import { getDetailedFormatedDate } from "../../composables/useUtils"
import { useI18n } from "#imports"

const { locale } = useI18n()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
const open = ref(false)
const detailedStart = getDetailedFormatedDate(props.item.start, locale.value)
const startDay = ref(
  `${detailedStart.day} ${detailedStart.month} ${detailedStart.year}`,
)
const startTime = ref(detailedStart.hours)
const detailedStop = getDetailedFormatedDate(props.item.stop, locale.value)
const stopTime = ref(detailedStop.hours)
</script>

<style lang="scss" scoped></style>

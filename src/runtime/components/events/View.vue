<template>
  <div class="">
    <v-row>
      <v-col v-if="mdAndUp" cols="12" md="3">
        <MiscAtomsImageContainer
          cover
          :src="
            item && item.image && item.image.url ? item.image : '/default.png'
          "
          :ratio="1 / 1"
          :loading="loading"
        />
      </v-col>

      <v-col
        cols="12"
        md="9"
        class="d-flex flex-sm-column flex-md-column justify-md-end flex-wrap"
      >
        <v-skeleton-loader
          v-if="loading"
          width="100%"
          :type="
            [
              'subtitle, heading@2, text, button',
              'subtitle, heading@2, text, button',
              'subtitle, heading@2, text, button',
              'subtitle, heading@2, text, button',
              'subtitle, heading@2, text, button',
              'subtitle, heading@2, text, button',
            ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
          "
        />

        <template v-else>
          <div class="d-flex align-center flex-column">
            <div class="d-flex text-center text-wrap text-h3 text-black">
              {{ item.name }}
            </div>

            <v-divider width="154px" class="mb-1 mt-6" />
            <v-divider width="154px" />

            <div
              v-if="item && item.category"
              class="d-flex text-center text-wrap text-h5 font-weight-black mt-6"
            >
              {{ $t("list.filters.events.category." + item.category) }}
            </div>

            <MDC
              v-if="item.subtitle"
              class="d-flex text-center text-wrap text-h5 text-black mt-4"
              :value="item.subtitle"
            />

            <div class="d-flex text-center text-wrap text-h5 text-black mt-4">
              <!--   <EventsBadges :item="item" /> -->
            </div>

            <v-divider width="154px" class="mb-1 mt-6" />
            <v-divider width="154px" />
          </div>
        </template>
      </v-col>
    </v-row>

    <v-row class="mt-md-3 mt-lg-10 mt-xl-12">
      <v-col v-if="mdAndUp" class="d-flex flex-column" cols="12" md="3">
        <v-skeleton-loader
          v-if="loading"
          height="100%"
          :type="
            [
              '',
              '',
              'image, image, heading, list-item@2',
              'image, image, heading, list-item@2',
              'image, image, heading, list-item@2',
              'image, image, heading, list-item@2',
            ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
          "
        />

        <template v-else>
          <div class="bg-grey-lighten-4">
            <div class="ma-md-4 ma-lg-8">
              <EventsDateTimePlace :item="item" />
              <template v-if="bookingState === 'OPEN'">
                <div class="mt-md-4">
                  <!--  TODO: bind -->
                  {{ $t("register-until-0", [getLocalizedDate(item.stop)]) }}
                </div>
                <div class="mt-md-4">
                  {{ $t("inscription-gratuite-et-obligatoire") }}
                </div>
              </template>
            </div>
          </div>

          <div class="mt-md-4 mt-lg-6 mt-xl-8 d-flex">
            <EventsRegisterModal
              v-if="!loading && bookingState === 'OPEN'"
              :item="item"
            >
              <template #activator="activatorProps">
                <v-btn
                  color="grey-lighten-3"
                  v-bind="activatorProps"
                  flat
                  tile
                  block
                  class="my-2"
                  style="height: auto"
                >
                  <template #append>
                    <v-icon class="text-green" size="x-large">
                      mdi-circle-medium
                    </v-icon>
                  </template>
                  {{ $t("inscription-ouverte") }}
                </v-btn>
              </template>
            </EventsRegisterModal>
          </div>

          <v-sheet class="mt-md-0 mt-lg-2 mt-xl-4">
            <v-list v-if="!loading && item.files && item.files.length">
              <v-list-subheader class="text-overline font-weight-bold">
                {{ $t("document") }}
              </v-list-subheader>

              <v-list-item
                v-for="(file, i) in item.files"
                :key="i"
                :value="file"
              >
                <template #prepend>
                  <v-icon v-if="mdAndUp" :icon="getFileIcon(file.url)" />
                </template>
                <v-list-item-title class="text-wrap" v-text="file.name" />
              </v-list-item>
            </v-list>
          </v-sheet>
        </template>
      </v-col>

      <v-col v-if="sm" class="d-flex flex-row" cols="12">
        <v-row class="ml-sm-1">
          <v-col cols="6">
            <MiscAtomsImageContainer
              cover
              :src="item.image.url ? item.image : '/default.png'"
              :ratio="1 / 1"
              :loading="loading"
            />
          </v-col>
          <v-col cols="6">
            <v-skeleton-loader
              v-if="loading"
              type="heading, subtitle, heading, subtitle, ossein, button"
            />
            <EventsDateTimePlace v-else :item="item" />
          </v-col>
        </v-row>
      </v-col>

      <v-col v-if="xs" class="ml-2" cols="12">
        <MiscAtomsImageContainer
          cover
          :src="item.image.url ? item.image : '/default.png'"
          :ratio="1 / 1"
          :loading="loading"
        />
      </v-col>

      <v-col v-if="xs" class="ml-2" cols="12">
        <v-skeleton-loader
          v-if="loading"
          type="heading, subtitle, heading, subtitle, ossein, button"
        />
        <EventsDateTimePlace v-else :item="item" />
      </v-col>

      <v-col cols="12" md="9" class="px-0">
        <v-skeleton-loader
          v-if="loading"
          :type="
            [
              'avatar, text, ossein, avatar, text, ossein, avatar, text',
              'avatar, text, ossein, avatar, text, ossein, avatar, text',
              'button, button, ossein, text@40',
              'button, button, ossein, text@50',
              'button, button, ossein, text@50',
              'button, button, ossein, text@50',
            ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
          "
        />

        <template v-else>
          <div class="ml-md-8 ml-lg-10 ml-xl-12">
            <v-expansion-panels
              v-model="panel"
              outlined
              flat
              eager
              ripple
              variant="accordion"
              "
            >
              <v-expansion-panel
                v-if="item.description"
                :value="presentation"
                class="border-thin text-black"
                :color="key === accordeon ? 'light-grey' : 'white'"
              >
                <v-expansion-panel-title
                  collapse-icon="mdi-minus"
                  expand-icon="mdi-plus"
                  class="text-h6"
                  :class="{ 'font-weight-black': key === accordeon }"
                >
                  {{ $t("presentation") }}
                </v-expansion-panel-title>
                <v-expansion-panel-text
                  class="py-2"
                  style="white-space: pre; text-wrap: auto"
                >
                  <MDC v-if="item.description" :value="item.description" />
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel
                v-if="item.program"
                class="border-thin text-black"
                :color="key === accordeon ? 'light-grey' : 'white'"
              >
                <v-expansion-panel-title
                  collapse-icon="mdi-minus"
                  expand-icon="mdi-plus"
                  class="text-h6"
                  :class="{ 'font-weight-black': key === accordeon }"
                >
                  {{ $t("programme") }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <MDC v-if="item.program" :value="item.program" />

                  >
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel
                v-if="item.details"
                class="border-thin text-black"
                :color="key === accordeon ? 'light-grey' : 'white'"
              >
                <v-expansion-panel-title
                  collapse-icon="mdi-minus"
                  expand-icon="mdi-plus"
                  class="text-h6"
                  :class="{ 'font-weight-black': key === accordeon }"
                >
                  {{ $t("details-0") }}
                </v-expansion-panel-title>
                <v-expansion-panel-text
                  class="border-thin text-black"
                  :color="key === accordeon ? 'light-grey' : 'white'"
                >
                  <MDC v-if="item.details" :value="item.details" />
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </template>
      </v-col>
    </v-row>

    <!-- DIVIDERS -->
    <v-responsive class="mx-auto my-9" width="120">
      <v-divider class="mb-1" />
      <v-divider />
    </v-responsive>
    <MiscAtomsSlidingCarousel
      v-if="!loading && item && item.gallery && item.gallery.length"
      ref="MiscAtomsImage"
      key="MiscAtomsImage"
      :items="item.gallery"
      type="MiscAtomsImage"
      :loading="false"
      :more="false"
    >
      <div :class="mdAndUp ? 'text-h5' : 'text-h6'">
        {{ $t("gallery") }}
      </div>
    </MiscAtomsSlidingCarousel>
    <v-responsive class="mx-auto my-9" width="120">
      <v-divider class="mb-1" />
      <v-divider />
    </v-responsive>
    <MiscMoleculesRelated
      v-if="!loading && item && item.related"
      :related="item.related"
    />
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { useRouter } from "vue-router"
import getFileIcon from "../../composables/useIcons"
import { getLocalizedDate } from "../../composables/useUtils"
import { ref } from "#imports"

const { name, mdAndUp, sm, xs } = useDisplay()
const router = useRouter()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const panel = ref(0)

function redirectToMap(long, lat) {
  router.push(
    `https://www.openstreetmap.org/?mlat=${lat}&amp;mlon=${long}#map=19/${lat}/${long}`,
  )
}

console.log("Events", props.item)
</script>

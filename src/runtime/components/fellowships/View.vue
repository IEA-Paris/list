<template>
  <!--  {{ name }} -->
  <v-row justify="center">
    <v-col cols="12" sm="11" md="10" lg="9" xl="8">
      <v-row
        v-if="item && item.image && item.image.length"
        class="justify-center"
      >
        <v-col cols="12" sm="10" md="6" lg="4" xl="3" class="text-center">
          <!--   FELLOWSHIP IMAGE -->
          <MiscAtomsImageContainer
            contain
            :loading
            :src="item.image"
            :ratio="1 / 1"
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <v-skeleton-loader
            v-if="loading"
            :type="
              [
                'avatar, paragraph',
                'avatar, paragraph',
                'heading, ossein,	avatar, text, ossein, chip@3',
                'heading, ossein,	avatar, text, ossein, chip@3',
                'heading, ossein, avatar, text, ossein, chip@3',
                'heading',
              ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
            "
          />

          <div v-else class="d-flex align-center flex-column mt-12">
            <div class="d-flex text-center text-wrap text-h3 text-black">
              {{ item.name }}
            </div>
            <v-divider width="154px" class="mb-1 mt-6" />
            <v-divider width="154px" />
            <div class="d-flex text-center text-wrap text-h5 text-black mt-6">
              <MDC v-if="item.subtitle" :value="item.subtitle" />
            </div>
            <MiscMoleculesChipContainer
              :items="[
                $t(
                  'list.filters.fellowships.fellowshipType.' +
                    item.fellowshipType,
                ),
                ...(props.item && props.item.disciplines
                  ? props.item.disciplines.map((discipline) => discipline.name)
                  : []),
              ]"
              class="mt-2"
            />
            <div class="mt-5">
              <FellowshipsBadges :item="item" :view="view" />
            </div>
          </div>
          <div class="mx-6">
            <!-- DIVIDERS -->
            <v-responsive class="mx-auto my-9" width="120">
              <v-divider class="mb-1" />
              <v-divider />
            </v-responsive>

            <!-- FELLOWSHIP DESCRIPTION -->
            <v-skeleton-loader
              v-if="loading"
              :type="
                [
                  'text@50',
                  'text@50',
                  'text@50',
                  'text@50',
                  'text@50',
                  'text@50',
                ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
              "
            />
            <MDC v-if="item.description" :value="item.description" />

            <v-responsive class="mx-auto my-9" width="120">
              <v-divider class="mb-1" />
              <v-divider />
            </v-responsive>
            <v-skeleton-loader v-if="loading" />
            <v-expansion-panels
              v-else
              v-model="accordeon"
              flat
              ripple
              variant="accordion"
              class="py-8"
            >
              <v-expansion-panel
                v-for="(value, key) in Object.keys(renderedDetails)"
                :key="key + value"
                class="border-thin text-black"
                :color="key === accordeon ? 'light-grey' : 'white'"
              >
                <v-expansion-panel-title
                  collapse-icon="mdi-minus"
                  expand-icon="mdi-plus"
                  class="text-h6"
                  :class="{ 'font-weight-black': key === accordeon }"
                >
                  {{ $t(value) }}
                </v-expansion-panel-title>
                <v-expansion-panel-text
                  class="py-2"
                  style="white-space: pre; text-wrap: auto"
                >
                  <MDC
                    v-if="renderedDetails[value]"
                    :value="renderedDetails[value]"
                  />
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <v-responsive class="mx-auto my-9" width="120">
              <v-divider class="mb-1" />
              <v-divider />
            </v-responsive>

            <MiscAtomsSlidingCarousel
              v-if="item && item.fellows && item.fellows.length"
              key="people"
              ref="fellows"
              :items="item.fellows || []"
              type="people"
              lazy
              :loading
            >
              <div :class="mdAndUp ? 'text-h5' : 'text-h6'">
                {{ $t("this-fellowship-alumni") }}
              </div>
            </MiscAtomsSlidingCarousel>
          </div>
        </v-col>
        <MiscMoleculesRelated
          v-if="!loading && item && item.related"
          :related="item.related"
        />
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { ref } from "#imports"
const { name } = useDisplay()
const accordeon = ref(-1)
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
    required: true,
  },
  pathPrefix: {
    type: String,
    required: true,
  },
})

const view = ref(true)

const renderedDetails = {
  ...(props.item?.fellowshipDetails?.type && {
    type: props.item?.fellowshipDetails?.type,
  }),
  ...(props.item?.fellowshipDetails?.fundingPeriod && {
    fundingPeriod: props.item?.fellowshipDetails?.fundingPeriod,
  }),
  ...(props.item?.fellowshipDetails?.profile && {
    profile: props.item?.fellowshipDetails?.profile,
  }),
  ...(props.item?.fellowshipDetails?.tasks && {
    tasks: props.item?.fellowshipDetails?.tasks,
  }),
  ...(props.item?.fellowshipDetails?.location && {
    location: props.item?.fellowshipDetails?.location,
  }),
  ...(props.item?.fellowshipDetails?.funding && {
    funding: props.item?.fellowshipDetails?.funding,
  }),
  ...(props.item?.fellowshipDetails?.housing && {
    housing: props.item?.fellowshipDetails?.housing,
  }),
  ...(props.item?.fellowshipDetails?.meals && {
    meals: props.item?.fellowshipDetails?.meals,
  }),
  ...(props.item?.fellowshipDetails?.applicationMaterials && {
    applicationMaterials: props.item?.fellowshipDetails?.applicationMaterials,
  }),
  ...(props.item?.fellowshipDetails?.selectionProcess && {
    selectionProcess: props.item?.fellowshipDetails?.selectionProcess,
  }),
  ...(props.item?.fellowshipDetails?.researchProcess && {
    researchProcess: props.item?.fellowshipDetails?.researchProcess,
  }),
}
</script>

<style lang="scss" scoped></style>

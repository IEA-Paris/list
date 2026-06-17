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
            :loading="loading"
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

          <div v-else-if="item" class="d-flex align-center flex-column mt-12">
            <div
              class="d-flex text-center text-wrap text-h4 text-md-h3 text-black"
            >
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
              ]"
              class="mt-2"
            />
            <!-- DISCIPLINES -->
            <MiscMoleculesDisciplinesTags
              :disciplines="item.disciplines"
              justify="center"
              class="mt-4"
            />
            <div class="mt-5">
              <FellowshipsBadges :item="item" :view="view" :loading="loading" />
            </div>
          </div>
          <div>
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
            <MDC v-if="item && item.description" :value="item.description" />

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
              :loading="loading"
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
import { computed, ref } from "#imports"
const { name } = useDisplay()
const accordeon = ref(-1)
const props = defineProps({
  // null while the resource item is loading (see useI18nResourceItem)
  item: {
    type: Object,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const view = ref(true)

// computed (not a one-shot setup value) so it picks up `item` once it loads in
const renderedDetails = computed(() => {
  const d = props.item?.fellowshipDetails
  if (!d) return {}
  return {
    ...(d.type && { type: d.type }),
    ...(d.fundingPeriod && { fundingPeriod: d.fundingPeriod }),
    ...(d.profile && { profile: d.profile }),
    ...(d.tasks && { tasks: d.tasks }),
    ...(d.location && { location: d.location }),
    ...(d.funding && { funding: d.funding }),
    ...(d.housing && { housing: d.housing }),
    ...(d.meals && { meals: d.meals }),
    ...(d.applicationMaterials && {
      applicationMaterials: d.applicationMaterials,
    }),
    ...(d.selectionProcess && { selectionProcess: d.selectionProcess }),
    ...(d.researchProcess && { researchProcess: d.researchProcess }),
  }
})
</script>

<style lang="scss" scoped></style>

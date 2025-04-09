<template>
  <v-row>
    <v-col
      v-if="smAndDown"
      cols="12"
      class="text-wrap text-h4 text-black mx-sm-6"
    >
      <v-skeleton-loader
        v-if="loading"
        :type="['heading', 'heading'][['xs', 'sm'].indexOf(name || 'sm')]"
      />
      <template v-else>
        <v-chip v-if="item && item.category && item.name" class="mb-4">
          {{ $t("list.filters.news.category." + item.category) }}
        </v-chip>
        <br />
        {{ item.name }}
      </template>
    </v-col>
    <v-col cols="12" md="4" class="pb-0">
      <v-skeleton-loader v-if="loading" height="100%" type="image" />

      <div v-else class="mx-sm-6">
        <MiscAtomsImageContainer
          v-if="item && item.image"
          cover
          :loading="loading"
          :src="item.image.url ? item.image : '/default.png'"
          :ratio="1 / 1"
        />
      </div>
    </v-col>

    <v-col cols="12" md="8" class="pl-0 pb-0 d-flex flex-column justify-md-end">
      <v-skeleton-loader
        v-if="loading"
        :type="
          [
            'text, chip@4',
            'text, chip@4',
            'heading, text',
            'heading, text',
            'heading, text',
            'heading',
          ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
        "
      />

      <div v-else class="mx-4 mx-md-0 justify-md-end">
        <v-chip v-if="item && item.category && mdAndUp" class="mb-4">
          {{ $t("list.filters.news.category." + item.category) }}
        </v-chip>
        <div
          v-if="item && item.name && mdAndUp"
          class="d-flex text-wrap text-h4 text-black"
        >
          {{ item.name }}
        </div>

        <div
          v-if="renderedDescription && mdAndUp"
          class="d-flex text-wrap text-h6 text-black mt-3"
        >
          <MDC
            v-if="item.description"
            :value="item.description"
            class="mt-md-n2 mx-4 mx-sm-8 mx-md-0"
          />
        </div>
        <div
          class="d-flex flex-column flex-md-row align-md-center mt-6 mx-sm-4 mx-md-6"
        >
          <div class="ml-md-n6">
            <div
              v-if="item && item.authors && item.authors[0]"
              class="text-body-2 text-lg-body-1 text-black"
            >
              <!--    TODO use a proper & conditional formatting of names (depending on number of authors) -->
              {{
                $t("by-author", [
                  item.authors[0].firstname + " " + item.authors[0].firstname,
                ])
              }}
            </div>
            <div v-if="smAndDown" class="">
              <MiscMoleculesChipContainer
                v-if="item && item.tags"
                :items="item.tags"
                class="mt-4"
              />
            </div>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>

  <v-row class="mt-12">
    <v-col cols="12" md="4" :order="mdAndUp ? 'first' : 'last'" class="pt-0">
      <v-skeleton-loader
        v-if="loading"
        :type="
          ['chip@2', 'chip@3', 'chip@4', 'chip@5'][
            ['md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
          ]
        "
      />
      <template v-else>
        <div v-if="mdAndUp" class="mt-2 mx-sm-6">
          <MiscMoleculesChipContainer
            v-if="item && item.tags"
            :items="item.tags"
            class="mt-4"
          />
        </div>
      </template>
    </v-col>
    <v-col cols="12" md="8" class="pl-0 pt-0">
      <v-skeleton-loader
        v-if="loading"
        :type="
          ['text@50', 'text@50', 'text@50', 'text@50', 'text@50', 'text@50'][
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
          ]
        "
      />
      <MDC
        v-if="item.description"
        :value="item.description"
        class="mt-md-n2 mx-4 mx-sm-8 mx-md-0"
      />
    </v-col>
  </v-row>

  <!-- DIVIDERS -->
  <v-responsive class="mx-auto my-9" width="120">
    <v-divider class="mb-1" />
    <v-divider />
  </v-responsive>
  <!--   <MiscAtomsSlidingCarousel
    v-if="item && item.gallery && item.gallery.length"
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
  </MiscAtomsSlidingCarousel> -->
  <!-- DIVIDERS -->
  <v-responsive class="mx-auto my-9" width="120">
    <v-divider class="mb-1" />
    <v-divider />
  </v-responsive>

  <MiscMoleculesRelated v-if="item && item.related" :related="item.related" />
</template>

<script setup>
import { useDisplay } from "vuetify";
import { useNuxtApp } from "#imports";

const { $stores } = useNuxtApp();
const { name, mdAndUp, smAndDown } = useDisplay();
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
});

const today = new Date();
/* const academicYear = ref(
   today.getMonth() > 6
    ? today.getFullYear() + "-" + (today.getFullYear() + 1)
    : today.getFullYear() - 1 + "-" + today.getFullYear()
)
const { data: action } = await useAsyncData("actions", () =>
  queryContent("/actions/" + locale.value)
    .limit(1)
    .find()
) */
$stores.news.loading = false;
</script>

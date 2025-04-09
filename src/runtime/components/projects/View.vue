<template>
  <!--  {{ name }} -->
  <v-row justify="center">
    <v-col cols="12" sm="11" md="8" lg="8" xl="6">
      <v-row class="justify-center">
        <v-col cols="12" sm="10" md="6" lg="4" xl="3" class="text-center">
          <!--   PROJECT IMAGE -->
          <v-skeleton-loader v-if="loading" height="100%" type="image" />

          <MiscAtomsImageContainer
            v-else
            contain
            :loading="loading"
            :src="item.image.url ? item.image : '/default.png'"
            :ratio="1 / 1"
          />
        </v-col>
      </v-row>
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
        <div
          v-if="!loading"
          class="d-flex text-center text-wrap text-h5 text-black mt-6"
        >
          <MDC v-if="item.subtitle" :value="item.subtitle" />
        </div>
        <MiscMoleculesChipContainer
          v-if="item && item.tags"
          :items="item.tags"
          class="py-6 mt-4 align-self-center"
        />
        <v-btn-toggle variant="outlined">
          <MiscAtomsShareMenu :item class="mt-6" />
        </v-btn-toggle>
        <v-btn
          v-if="item.url"
          class="my-6 d-flex"
          variant="outlined"
          :href="item.url"
          target="_blank"
          prepend-icon="mdi-link"
        >
          {{ $t("visit-this-project-website") }}
        </v-btn>
      </div>

      <!-- DIVIDERS -->
      <v-responsive class="mx-auto my-9" width="120">
        <v-divider class="mb-1" />
        <v-divider />
      </v-responsive>

      <!-- PROJECT DESCRIPTION -->
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
        class="mt-md-n2 mx-10 mx-md-0"
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
const { name } = useDisplay();
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
$stores.projects.loading = false;
</script>

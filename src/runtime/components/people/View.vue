<template>
  <v-row justify="center">
    <v-col cols="12" sm="11" md="8" lg="8" xl="6">
      <v-row no-gutters class="justify-center">
        <v-col cols="12" sm="10" md="6" class="text-center">
          <!--   PEOPLE IMAGE -->
          <MiscAtomsImageContainer
            v-if="mdAndUp && item && item.image"
            cover
            :loading="loading"
            :src="item.image"
            :ratio="1 / 1"
            :width="
              [200, 250, 250, 300][
                ['md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
              ]
            "
          />
        </v-col>
        <v-col cols="12" class="text-center">
          <!-- FIRSTNAME LASTNAME -->
          <v-skeleton-loader
            v-if="loading"
            class="mx-auto"
            :max-width="
              ['300', '400', '340', '400', '600', '600'][
                ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
              ]
            "
            :type="
              [
                'heading@2, ossein, avatar@4, ossein, chip@3',
                'heading, ossein, avatar@6, ossein, chip@4',
                'heading, ossein, avatar@5, ossein, chip@3',
                'heading, ossein, avatar@6, ossein, chip@4',
                'heading, ossein, avatar@9, ossein, chip@6',
                'heading, ossein, avatar@9, ossein, chip@6',
              ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
            "
          />

          <template v-else>
            <div
              v-if="item && item.firstname && item.lastname"
              class="my-8 text-h3 align-self-center text-wrap"
            >
              {{ item.firstname + " " + item.lastname
              }}<!--  TODO : call a composable to format people names (multiple, initials, capped & al. ) -->
            </div>
            <!-- SOCIALS -->
            <div class="text-center">
              <MiscAtomsSocials
                v-if="item && item.socials"
                :socials="item.socials"
              />
            </div>
            <!-- GROUPS -->
            <div class="mt-6 align-self-center">
              <PeopleGroupBadges v-if="item && item.groups" :item="item" />
            </div>
          </template>
        </v-col>
      </v-row>

      <!-- DIVIDERS -->
      <v-responsive class="mx-auto my-6" width="120">
        <v-divider class="mb-1" />
        <v-divider />
      </v-responsive>

      <div class="text-overline mt-6">
        <v-skeleton-loader v-if="loading" width="200" type="heading" />
        <div v-else>
          {{ $t("biography") }}
        </div>
      </div>

      <v-skeleton-loader
        v-if="loading"
        :type="
          ['text@16', 'text@16', 'text@16', 'text@12', 'text@12', 'text@12'][
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
          ]
        "
      />
      <template v-else class="my-6 flex-wrap">
        <MDC v-if="item.biography" :value="item.biography" />
      </template>

      <!-- DIVIDERS -->
      <v-responsive class="mx-auto my-9" width="120">
        <v-divider class="mb-1" />
        <v-divider />
      </v-responsive>

      <!-- POSITIONS AND AFFILIATIONS -->
      <div class="text-overline mt-6">
        <v-skeleton-loader v-if="loading" width="200" type="heading" />
        <div v-else>
          {{ $t("positions-and-affiliations") }}
        </div>
      </div>

      <!-- BIOGRAPHY -->
      <v-skeleton-loader v-if="loading" type="subtitle, text@2" width="300" />

      <v-card
        v-for="record in item.affiliations"
        v-else-if="item && item.affiliations"
        :key="record.affiliation"
        flat
      >
        <v-card-item class="px-0">
          <v-card-title class="text-wrap">
            {{ record.affiliation.name }}
          </v-card-title>
          <div
            v-for="(position, index) in record.positions"
            :key="position.role + index"
            class="text-body-2"
          >
            {{ position.role + " " + (position.department || "") }}
            <span v-if="position.start" class="">
              <!--  TODO FIx dates display -->
              -
              {{
                $t("from {0} to {1}", [
                  formatDate(position.start, locale),
                  (position.stop && formatDate(position.stop, locale)) ||
                    $t("present"),
                ])
              }}
            </span>
          </div>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>

  <!-- DIVIDERS -->
  <v-responsive class="mx-auto my-9" width="120">
    <v-divider class="mb-1" />
    <v-divider />
  </v-responsive>
  <MiscMoleculesRelated v-if="item && item.related" :related="item.related" />
</template>

<script setup>
import { useDisplay } from "vuetify";
import { useNuxtApp, useI18n } from "#imports";

const { locale } = useI18n();
const { $stores } = useNuxtApp();
const { name, mdAndUp } = useDisplay();
const props = defineProps({
  item: { type: Object, required: true },
  loading: { type: Boolean, default: false },
});
$stores.people.loading = false;
</script>

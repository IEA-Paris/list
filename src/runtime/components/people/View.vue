<template>
  <v-row justify="center">
    <v-col cols="12" sm="11" md="8" lg="8" xl="6">
      <v-row no-gutters class="justify-center">
        <v-col
          cols="12"
          sm="10"
          md="6"
          class="d-flex align-center justify-center"
        >
          <!--   PEOPLE IMAGE -->
          <MiscAtomsImageContainer
            v-if="mdAndUp"
            cover
            :loading="loading"
            :src="
              item && item.image && item.image.url ? item.image : '/default.png'
            "
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
              class="mt-8 mb-2 text-h3 align-self-center text-wrap"
            >
              {{ item.firstname + " " + item.lastname
              }}<!--  TODO : call a composable to format people names (multiple, initials, capped & al. ) -->
            </div>
            <!-- PRESENT -->
            <div v-if="isPresent" class="mb-6 d-flex justify-center">
              <span class="present-pill">
                <span class="present-dot" />
                {{ $t("present") }}
              </span>
            </div>
            <div v-else class="mb-6" />
            <!-- SOCIALS -->
            <div class="text-center">
              <MiscAtomsSocials
                v-if="item && item.socials"
                :socials="item.socials"
              />
            </div>
            <!-- GROUPS -->
            <div class="mt-6 align-self-center">
              <PeopleBadges v-if="item && item.groups" :item="item" />
            </div>

            <!-- FELLOWSHIP -->
            <div v-if="fellowName || fellowTheme || fellowDates" class="mt-6">
              <div v-if="fellowName" class="text-h6 font-weight-regular">
                {{ fellowName }}
              </div>

              <!-- DISCIPLINES -->
              <div
                v-if="disciplines.length"
                class="mt-4 d-flex flex-wrap justify-center"
                style="gap: 6px"
              >
                <v-chip
                  v-for="(d, i) in disciplines"
                  :key="d + i"
                  size="small"
                  variant="flat"
                  tile
                  color="grey-lighten-3"
                  class="discipline-chip"
                >
                  {{ disciplineLabel(d) }}
                </v-chip>
              </div>
              <div v-if="fellowTheme" class="text-body-1 mt-1 font-italic">
                {{ fellowTheme }}
              </div>
              <div
                v-if="fellowDates"
                class="text-body-2 mt-1 text-medium-emphasis"
              >
                {{ fellowDates }}
              </div>
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
        <MDC
          v-if="item.biography && item.biography.length > 0"
          :value="item.biography"
        />
        <div v-else class="text-body-2">
          {{ $t("no-biography") }}
        </div>
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
            <template v-if="position.role === 'Fellow'">
              <span class="text-caption text-uppercase">
                {{ $t("fellow") }}
              </span>
            </template>
            <template v-else>
              {{ position.role + " " + (position.department || "") }}
            </template>
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
import { useDisplay } from "vuetify"
import { computed, useNuxtApp, useI18n } from "#imports"
import { formatDate } from "../../composables/useUtils"

const { t, locale } = useI18n()
const { $stores } = useNuxtApp()
const { name, mdAndUp } = useDisplay()
const props = defineProps({
  item: { type: Object, required: true },
  loading: { type: Boolean, default: false },
})
$stores.people.loading = false

// disciplines: scalar enum array → translated labels
const disciplines = computed(() =>
  Array.isArray(props.item?.disciplines) ? props.item.disciplines : [],
)
const disciplineLabel = (d) => t("list.filters.disciplines." + d)

// latest is a union Vintage | Position; the fellowship program lives on the
// Vintage branch (name = program name, theme = fellowship theme) and carries the
// arrival/departure dates (start/stop). Guard by field presence.
const latest = computed(() => props.item?.latest ?? null)
const fellowName = computed(() => latest.value?.name ?? null)
const fellowTheme = computed(() => latest.value?.theme ?? null)

// "present" = currently in residence/post: started on or before today and not
// yet ended. Works for both Vintage and Position; degrades to false if start/stop
// are absent (e.g. before the trees query change is published).
const isPresent = computed(() => {
  const l = latest.value
  if (!l?.start) return false
  const now = Date.now()
  if (new Date(l.start).getTime() > now) return false
  if (!l.stop) return true
  return new Date(l.stop).getTime() >= now
})

// Arrival/departure dates straight from latest.start/latest.stop.
const fellowDates = computed(() => {
  const l = latest.value
  if (!l?.start) return null
  return t("from {0} to {1}", [
    formatDate(l.start, locale.value),
    (l.stop && formatDate(l.stop, locale.value)) || t("present"),
  ])
})
</script>

<style scoped>
/* Disciplines: filled, rounded, soft grey — consistent with the people list
   (DenseItem.vue) so the chip language matches across views. */
.discipline-chip {
  color: rgba(0, 0, 0, 0.78);
  font-weight: 500;
  border-radius: 6px;
}

/* "Present" indicator — same discrete grey pill + green dot as DenseItem.vue. */
.present-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1;
  padding: 4px 10px;
  border-radius: 999px;
  background-color: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.7);
}
.present-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #4caf50;
}
</style>

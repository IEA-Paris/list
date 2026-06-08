<template>
  <ListMoleculesDenseItemContainer
    class="expandable-dense-item"
    :class="expanded ? 'expanded' : 'collapsed'"
    @click="toggle"
  >
    <v-col
      v-if="mdAndUp"
      :cols="expanded ? 3 : 'auto'"
      :offset="!expanded && name.startsWith('search') ? 1 : 0"
      class="animated-col"
      :class="{ 'expanded-col': expanded }"
    >
      <MiscAtomsImageContainer
        cover
        :loading="loading"
        :src="
          item && item.image && item.image.url ? item.image.url : '/default.png'
        "
        :ratio="1 / 1"
        :width="expanded ? undefined : 100"
        class="ma-1 animated-image"
        :class="expanded ? 'scaled-up' : 'scaled-down'"
      />
    </v-col>
    <v-col
      align-self="start"
      class="dense"
      :class="expanded ? 'ml-md-8' : 'ml-md-2'"
    >
      <div class="text-overline" v-if="item.groups && item.groups.team">
        {{ item.latest.role[locale] }}
      </div>
      <v-skeleton-loader v-if="loading" type="heading" />

      <div
        v-else
        class="d-flex justify-space-between text-title align-center pt-md-2"
        :class="expanded ? 'text-h5 text-md-h4' : 'text-h5'"
      >
        <span
          v-html="
            searchQuery.length
              ? highlightAndTruncate(
                  300,
                  item.firstname + ' ' + item.lastname,
                  searchQuery.split(' '),
                )
              : item.firstname + ' ' + item.lastname
          "
        />
        <v-spacer />
        <PeopleBadges :item="item" />
      </div>
      <div
        v-if="item.group && item.groups.vintage && item.groups.vintage[0].theme"
        class="text-body-1 font-weight-light paragraph"
        v-html="
          searchQuery.length
            ? highlightAndTruncate(
                300,
                item.groups.vintage[0].theme,
                searchQuery.split(' '),
              )
            : item.groups.vintage[0].theme
        "
      />

      <v-expand-transition>
        <div v-show="expanded && item.socials" @click.stop>
          <MiscAtomsSocials v-if="item.socials" :socials="item.socials" />
        </div>
      </v-expand-transition>

      <v-skeleton-loader v-if="loading" type="paragraph" />

      <Transition v-else name="text-slide">
        <div
          v-if="expanded"
          key="biography"
          class="text-body-1 font-weight-light paragraph"
          :style="'-webkit-line-clamp:' + expandedLineClamp"
        >
          <MDC
            v-if="item.biography && item.biography.length"
            :value="
              searchQuery.length
                ? highlightAndTruncate(
                    600,
                    item.biography,
                    searchQuery.split(' '),
                  )
                : item.biography
            "
          />
          <div v-else class="text-body-2 font-italic">
            {{ $t("no-biography") }}
          </div>
        </div>
        <div
          v-else-if="mdAndUp && item.summary && item.summary.length"
          key="summary"
          class="text-body-1 font-weight-light paragraph"
          :style="'-webkit-line-clamp:' + collapsedLineClamp"
          v-html="
            searchQuery.length
              ? highlightAndTruncate(100, item.summary, searchQuery.split(' '))
              : item.summary
          "
        />
      </Transition>

      <v-expand-transition>
        <div v-show="expanded && isFellow" class="mt-3" @click.stop>
          <v-btn
            variant="outlined"
            size="small"
            tile
            :to="localePath('/fellows/' + fellowSlug)"
          >
            {{ $t("see-more") }}
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </v-expand-transition>
    </v-col>
  </ListMoleculesDenseItemContainer>
</template>

<script setup>
import { useRootStore } from "../../stores/root"
import { highlightAndTruncate } from "../../composables/useUtils"
import { computed, ref, useRoute, useNuxtApp, useLocalePath } from "#imports"
import { useDisplay } from "vuetify"
const { name } = useRoute()
const localePath = useLocalePath()
const { locale } = useI18n()

const { mdAndUp, name: displayName } = useDisplay()
const rootStore = useRootStore()
const { $stores } = useNuxtApp()
const searchQuery = computed(() =>
  name.startsWith("search") ? rootStore.search : $stores["people"].search || "",
)
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const expanded = ref(false)
const toggle = () => {
  expanded.value = !expanded.value
}

const breakpointIndex = computed(() =>
  ["xs", "sm", "md", "lg", "xl", "xxl"].indexOf(displayName.value || "md"),
)

const collapsedLineClamp = computed(
  () => [1, 1, 1, 2, 3, 3][breakpointIndex.value],
)

const expandedLineClamp = computed(() => {
  let base = [4, 5, 5, 7, 9, 11][breakpointIndex.value]
  if (props.item?.socials && Object.keys(props.item.socials).length > 0) {
    base -= [0, 1, 1, 1, 1, 2][breakpointIndex.value]
  }
  return base
})

const isFellow = computed(() => props.item?.groups?.fellows === true)
const fellowSlug = computed(() => props.item?.slug || props.item?.id)
</script>

<style lang="scss" scoped>
.expandable-dense-item {
  overflow: hidden;
  transition: background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  .animated-col {
    transition:
      flex 0.7s cubic-bezier(0.4, 0, 0.2, 1),
      max-width 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .animated-col.expanded-col {
    max-width: 20.833%;
    flex-basis: 20.833%;
  }
}

.animated-image {
  transform-origin: top left;
  transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);

  &.scaled-down {
    transform: scale(0.85);
  }

  &.scaled-up {
    transform: scale(1.05);
  }
}

.paragraph {
  max-width: 83ch !important;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.text-slide-enter-active,
.text-slide-leave-active {
  transition:
    opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    filter 0.6s ease;
}

.text-slide-leave-active {
  position: absolute;
  width: 100%;
}

.text-slide-enter-from {
  opacity: 0;
  transform: translateY(-8px);
  filter: blur(1.5px);
}

.text-slide-leave-to {
  opacity: 0;
  transform: translateY(8px);
  filter: blur(1.5px);
}
</style>

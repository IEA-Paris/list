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
      <div
        class="ma-1 animated-image logo-frame"
        :class="expanded ? 'scaled-up' : 'scaled-down'"
        :style="{
          backgroundColor: logoBackground,
          width: expanded ? '100%' : '100px',
          height: expanded ? undefined : '100px',
          aspectRatio: expanded ? '1 / 1' : undefined,
        }"
      >
        <MiscAtomsImageContainer
          :loading="loading"
          :src="
            item && item.image && item.image.url
              ? item.image.url
              : '/default.png'
          "
          :ratio="1 / 1"
          :width="expanded ? undefined : 100"
          class="logo-image"
        />
      </div>
    </v-col>
    <v-col
      align-self="start"
      class="dense"
      :class="expanded ? 'ml-md-8' : 'ml-md-2'"
    >
      <v-skeleton-loader v-if="loading" type="heading" />
      <div
        v-else
        class="d-flex justify-space-between text-title align-center pt-md-2"
        :class="expanded ? 'text-h5 text-md-h4' : 'text-h5'"
      >
        <span
          v-html="
            searchQuery.length
              ? highlightAndTruncate(300, item.name, searchQuery.split(' '))
              : item.name
          "
        />
      </div>

      <v-skeleton-loader v-if="loading" type="paragraph" />

      <Transition v-else name="text-slide">
        <div
          v-if="expanded"
          key="description"
          class="text-body-1 font-weight-light paragraph"
          :style="'-webkit-line-clamp:' + expandedLineClamp"
        >
          <MDC
            v-if="item.description && item.description.length"
            :value="
              searchQuery.length
                ? highlightAndTruncate(
                    600,
                    item.description,
                    searchQuery.split(' '),
                  )
                : item.description
            "
          />
          <div v-else class="text-body-2 font-italic">
            {{ $t("no-description") }}
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
        <div v-show="expanded" class="mt-3" @click.stop>
          <v-btn
            variant="outlined"
            size="small"
            tile
            :href="itemUrl"
            target="_blank"
            rel="noopener"
          >
            {{ $t("see-more") }}
            <v-icon end>mdi-open-in-new</v-icon>
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

const { mdAndUp, name: displayName } = useDisplay()
const rootStore = useRootStore()
const { $stores } = useNuxtApp()
const searchQuery = computed(() =>
  name.startsWith("search")
    ? rootStore.search
    : $stores["affiliations"]?.search || "",
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

const expandedLineClamp = computed(
  () => [4, 5, 5, 7, 9, 11][breakpointIndex.value],
)

const itemUrl = computed(() => {
  const url = props.item?.url
  if (!url) return undefined
  if (/^https?:\/\//i.test(url)) return url
  return localePath(url.startsWith("/") ? url : "/" + url)
})

const logoBackground = computed(() => {
  const named = { white: "#fff", black: "#000" }
  const raw = props.item?.image?.backgroundColor
  if (!raw) return "transparent"
  const lower = String(raw).toLowerCase()
  return named[lower] || raw
})
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

.logo-frame {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 2px;
  box-sizing: border-box;
  overflow: hidden;

  .logo-image {
    width: 100%;
    height: 100%;
  }

  .logo-image :deep(> div) {
    width: 100% !important;
    height: 100% !important;
  }

  :deep(.v-img__img) {
    object-fit: contain !important;
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

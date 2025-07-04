<template>
  <div class="slider-container">
    <!-- Header with counter and navigation -->
    <div class="slider-header">
      <div class="slide-counter">
        {{ activeSlideIndex + 1 }}/{{ items.length }}
      </div>
      <div class="navigation-controls">
        <button
          :disabled="!canGoBack"
          class="nav-button nav-prev"
          @click="goToSlide(activeSlideIndex - 1)"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <button
          :disabled="!canGoForward"
          class="nav-button nav-next"
          @click="goToSlide(activeSlideIndex + 1)"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Slider container -->
    <div ref="sliderRef" class="slider-viewport" @scroll="handleScroll">
      <div
        class="slider-track"
        :style="{ transform: `translateX(${offsetX}px)` }"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          class="slide-item"
          :class="{
            'slide-visible': isSlideVisible(index),
            'slide-entering': isSlideEntering(index),
            'slide-exiting': isSlideExiting(index),
          }"
          :style="getSlideStyle(index)"
        >
          <component :is="itemComponent" :item="item" :index="index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from "vue"
import { useRootStore } from "../../../stores/root"
import { capitalize } from "../../../composables/useUtils"
import { useNuxtApp, useI18n } from "#imports"

defineOptions({ name: "ListOrganismsSlider" })

const { $stores } = useNuxtApp()
const { locale } = useI18n()
const rootStore = useRootStore()

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
})

// Data from store
const items = computed(() => $stores[props.type].items)

// Reactive state
const sliderRef = ref(null)
const activeSlideIndex = ref(0)
const offsetX = ref(0)
const containerWidth = ref(0)
const slideWidth = ref(0)
const slidesPerView = ref(1)

// Computed properties
const itemComponent = computed(() => {
  return capitalize(props.type) + "SlidingItem"
})

const totalSlides = computed(() => items.value.length)

const canGoBack = computed(() => activeSlideIndex.value > 0)

const canGoForward = computed(() => {
  const maxIndex = Math.max(0, totalSlides.value - slidesPerView.value)
  return activeSlideIndex.value < maxIndex
})

const visibleSlideIndices = computed(() => {
  const start = activeSlideIndex.value
  const end = Math.min(start + slidesPerView.value, totalSlides.value)
  return Array.from({ length: end - start }, (_, i) => start + i)
})

// Methods
const calculateDimensions = () => {
  if (!sliderRef.value) return

  containerWidth.value = sliderRef.value.offsetWidth

  // Calculate slide width based on container and desired slides per view
  const breakpoints = {
    320: { slidesPerView: 1.2, spacing: 20 },
    640: { slidesPerView: 2, spacing: 24 },
    960: { slidesPerView: 2.5, spacing: 28 },
    1280: { slidesPerView: 3, spacing: 32 },
    1600: { slidesPerView: 3.5, spacing: 36 },
  }

  const currentBreakpoint = Object.entries(breakpoints)
    .reverse()
    .find(([width]) => window.innerWidth >= Number.parseInt(width))

  const config = currentBreakpoint ? currentBreakpoint[1] : breakpoints[320]
  slidesPerView.value = Math.floor(config.slidesPerView)

  slideWidth.value =
    (containerWidth.value - config.spacing * (config.slidesPerView - 1)) /
    config.slidesPerView
}

const isSlideVisible = (index) => {
  return visibleSlideIndices.value.includes(index)
}

const isSlideEntering = (index) => {
  const rightmostVisible = Math.max(...visibleSlideIndices.value)
  return index === rightmostVisible && index > activeSlideIndex.value
}

const isSlideExiting = (index) => {
  const leftmostVisible = Math.min(...visibleSlideIndices.value)
  return index === leftmostVisible && index < activeSlideIndex.value
}

const getSlideStyle = (index) => {
  const baseStyles = {
    width: `${slideWidth.value}px`,
    opacity: isSlideVisible(index) ? 1 : 0,
    transform: `translateX(${index * (slideWidth.value + 24)}px)`,
    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  }

  // Add special animations for entering/exiting slides
  if (isSlideEntering(index)) {
    baseStyles.transform += " translateX(20px)"
    baseStyles.opacity = 0.8
  }

  if (isSlideExiting(index)) {
    baseStyles.transform += " translateX(-20px)"
    baseStyles.opacity = 0.6
  }

  return baseStyles
}

const goToSlide = (targetIndex) => {
  const maxIndex = Math.max(0, totalSlides.value - slidesPerView.value)
  const newIndex = Math.max(0, Math.min(targetIndex, maxIndex))

  if (newIndex === activeSlideIndex.value) return

  activeSlideIndex.value = newIndex
  updateSliderPosition()
}

const updateSliderPosition = () => {
  // Calculate offset to show current slide group
  const newOffset = -(activeSlideIndex.value * (slideWidth.value + 24))

  // Add slight offset for visual appeal (Radcliffe-style)
  const visualOffset = activeSlideIndex.value > 0 ? -40 : 0

  offsetX.value = newOffset + visualOffset
}

const handleScroll = () => {
  // Optional: handle manual scrolling
}

const handleResize = () => {
  calculateDimensions()
  updateSliderPosition()
}

// Lifecycle
onMounted(async () => {
  await nextTick()
  calculateDimensions()
  updateSliderPosition()

  window.addEventListener("resize", handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize)
  rootStore.resetState(props.type, locale.value)
})

// Watch for items changes
watch(
  () => items.value,
  () => {
    nextTick(() => {
      calculateDimensions()
      updateSliderPosition()
    })
  },
  { deep: true },
)

// Initialize data
try {
  await rootStore.update(props.type, locale.value)
} catch (error) {
  console.log("error fetching update list: ", error)
}
</script>

<style scoped>
.slider-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 0 20px;
}

.slide-counter {
  font-size: 14px;
  font-weight: 500;
  color: #666;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.navigation-controls {
  display: flex;
  gap: 8px;
}

.nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid #e0e0e0;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #333;
}

.nav-button:hover:not(:disabled) {
  background: #f5f5f5;
  border-color: #d0d0d0;
}

.nav-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  color: #999;
}

.slider-viewport {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 0 20px;
}

.slider-track {
  display: flex;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
}

.slide-item {
  flex-shrink: 0;
  margin-right: 24px;
  transform-origin: center;
  will-change: transform, opacity;
}

.slide-item:last-child {
  margin-right: 0;
}

/* Radcliffe-style animations */
.slide-entering {
  animation: slideInFromRight 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-exiting {
  animation: slideOutToLeft 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes slideInFromRight {
  from {
    transform: translateX(40px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutToLeft {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-40px);
    opacity: 0.6;
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .slider-header {
    padding: 0 16px;
    margin-bottom: 20px;
  }

  .slider-viewport {
    padding: 0 16px;
  }

  .slide-item {
    margin-right: 16px;
  }
}

@media (max-width: 480px) {
  .slide-counter {
    font-size: 12px;
  }

  .nav-button {
    width: 36px;
    height: 36px;
  }

  .nav-button svg {
    width: 20px;
    height: 20px;
  }
}
</style>

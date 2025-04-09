<template>
  <span> {{ displayedAmount }}</span>
</template>

<script setup lang="ts">
/* 
/!\ This component is a port by Antoine Cordelois 
of the vue3-autocounter package made by ps-christopher 
into a nuxt composition API component. 

Source code is here: https://github.com/ps-cristopher/vue3-autocounter/blob/master/src/vue3-autocounter.vue
*/
interface Data {
  timestamp: number
  startTimestamp: number | null
  currentStartAmount: number
  currentAmount: number
  currentDuration: number
  paused: boolean
  remaining: number
  animationFrame: number
}

// Props
const props = defineProps({
  startAmount: {
    type: Number,
    default: 0,
  },
  endAmount: {
    type: Number,
    default: 0,
    required: true,
  },
  duration: {
    type: Number,
    default: 3,
    validator(duration: number): boolean {
      return duration > 0
    },
  },
  autoinit: {
    type: Boolean,
    default: true,
  },
  prefix: {
    type: String,
    default: "",
  },
  suffix: {
    type: String,
    default: "",
  },
  separator: {
    type: String,
    default: ",",
  },
  decimalSeparator: {
    type: String,
    default: ".",
  },
  decimals: {
    type: Number,
    default: 0,
    validator(decimals: number): boolean {
      return decimals >= 0
    },
  },
})

// Reactive state
const state = reactive<Data>({
  timestamp: 0,
  startTimestamp: null,
  currentAmount: props.startAmount,
  currentStartAmount: props.startAmount,
  currentDuration: props.duration * 1000,
  paused: false,
  remaining: props.duration * 1000,
  animationFrame: 0,
})

// Computed properties
const isCountingUp = computed(() => props.endAmount > props.startAmount)

const formatedAmount = computed((): string => {
  const regex = /(\d+)(\d{3})/
  const numberString: string = state.currentAmount.toFixed(props.decimals)
  const numberArray: string[] = numberString.split(".")
  let numbers: string = numberArray[0]
  const decimals: string =
    numberArray.length > 1 ? props.decimalSeparator + numberArray[1] : ""
  const isNumber = !isNaN(parseFloat(props.separator))

  if (props.separator && !isNumber) {
    while (regex.test(numbers)) {
      numbers = numbers.replace(regex, "$1" + props.separator + "$2")
    }
  }

  return numbers + decimals
})

const displayedAmount = computed(
  () => `${props.prefix}${formatedAmount.value}${props.suffix}`
)

// Methods

const start = (): void => {
  cancelAnimation()
  state.currentStartAmount = props.startAmount
  state.startTimestamp = null
  state.currentDuration = props.duration * 1000
  state.paused = false
  state.animationFrame = window.requestAnimationFrame(counting)
}

const pause = (): void => {
  if (state.paused) return
  cancelAnimation()
  state.paused = true
}

const resume = (): void => {
  if (!state.paused) return
  state.startTimestamp = null
  state.currentDuration = +state.remaining
  state.currentStartAmount = +state.currentAmount
  state.animationFrame = window.requestAnimationFrame(counting)
  state.paused = false
}

const reset = (): void => {
  state.paused = false
  state.startTimestamp = null
  cancelAnimation()
  state.currentAmount = props.startAmount
  if (props.autoinit) start()
  else state.paused = true
}

const counting = (timestamp: number): void => {
  state.timestamp = timestamp
  if (!state.startTimestamp) state.startTimestamp = timestamp
  const progress: number = timestamp - state.startTimestamp
  state.remaining = state.currentDuration - progress

  if (!isCountingUp.value) {
    state.currentAmount =
      state.currentStartAmount -
      (state.currentStartAmount - props.endAmount) *
        (progress / state.currentDuration)
    state.currentAmount =
      state.currentAmount < props.endAmount
        ? props.endAmount
        : state.currentAmount
  } else {
    state.currentAmount =
      state.currentStartAmount +
      (props.endAmount - state.currentStartAmount) *
        (progress / state.currentDuration)
    state.currentAmount =
      state.currentAmount > props.endAmount
        ? props.endAmount
        : state.currentAmount
  }

  if (progress < state.currentDuration) {
    state.animationFrame = window.requestAnimationFrame(counting)
  } else {
    console.log("finished")
  }
}

const cancelAnimation = (): void => {
  if (state.animationFrame) window.cancelAnimationFrame(state.animationFrame)
}

// Watchers
watch(() => props.startAmount, reset)
watch(() => props.endAmount, reset)
watch(() => props.duration, reset)

// Lifecycle hooks
onMounted(() => {
  state.currentAmount = props.startAmount
  state.currentStartAmount = props.startAmount
  state.currentDuration = props.duration * 1000
  state.remaining = props.duration * 1000
  if (props.autoinit) start()
  else state.paused = true
})

onUnmounted(() => {
  cancelAnimation()
})
</script>

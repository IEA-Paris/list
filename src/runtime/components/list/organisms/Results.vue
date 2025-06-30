<template>
  <ListMoleculesGlobalSearchInput
    type="all"
    :placeholder="$t('search')"
    variant="outlined"
  />
  <ListMoleculesResultsContainer
    v-for="(type, index) in appConfig.list.modules"
    :key="index"
    :feminine="type === 'people'"
    :type
    :open="$rootStore.results[type].total > 0"
    @toggle="open[$event] = !open[$event]"
  >
    <v-expand-transition class="results-container">
      <div v-show="open[type]">
        <ListAtomsResultsList :type />
      </div> </v-expand-transition
  ></ListMoleculesResultsContainer>
</template>

<script setup>
import {
  onBeforeUnmount,
  onMounted,
  useI18n,
  useAppConfig,
  useNuxtApp,
} from "#imports"
const { $rootStore } = useNuxtApp()

const appConfig = useAppConfig()
const { locale } = useI18n()
const open = ref({})

onMounted(() => {
  // Initialize the page from the route
  console.log("mounted list")
})
try {
  await $rootStore.update("all", locale.value)
} catch (error) {
  console.log("error fetching update list: ", error)
}
onBeforeUnmount(() => {
  /* rootStore.resetState("all", locale.value) */
})
</script>
<style scoped>
.results-container {
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>

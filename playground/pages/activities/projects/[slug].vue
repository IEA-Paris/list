<template>
  <v-container style="max-width: 1600px">
    <ProjectsView :item="project" :loading="loading" />
  </v-container>
</template>

<script setup>
const { $queries } = useNuxtApp()
const { fetchItem } = useFetchItem()
const loading = ref(true)
// Fetch the item
const { data: project } = await useAsyncData("item", async () => {
  return await fetchItem({
    query: $queries.projects.get,
    key: "getProject",
  })
})
loading.value = false
</script>

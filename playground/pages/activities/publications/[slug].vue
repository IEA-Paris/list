<template>
  <v-container style="max-width: 1600px">
    <PublicationsView :item="publication" :loading="loading" />
  </v-container>
</template>

<script setup>
const { $queries } = useNuxtApp()
const { fetchItem } = useFetchItem()
const loading = ref(true)
// Fetch the item
const { data: publication } = await useAsyncData("item", async () => {
  return await fetchItem({
    query: $queries.publications.get,
    key: "getPublication",
  })
})
loading.value = false
</script>

<template>
  <v-container style="max-width: 1600px">
    <FellowshipsView :item="fellowship" :loading="loading" />
  </v-container>
</template>

<script setup>
const { $queries } = useNuxtApp()
const { fetchItem } = useFetchItem()
const loading = ref(true)
// Fetch the item
const { data: fellowship } = await useAsyncData("item", async () => {
  return await fetchItem({
    query: $queries.fellowships.get,
    key: "getFellowship",
  })
})
loading.value = false
</script>

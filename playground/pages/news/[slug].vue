<template>
  <v-container> <NewsView :item="news" :loading /></v-container>
</template>

<script setup>
const { $queries } = useNuxtApp()
const { fetchItem } = useFetchItem()
const loading = ref(true)
// Fetch the item
const { data: news } = await useAsyncData("item", async () => {
  return await fetchItem({
    query: $queries.news.get,
    key: "getNews",
  })
})
loading.value = false
</script>

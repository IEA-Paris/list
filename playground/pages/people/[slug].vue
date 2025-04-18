<template>
  <v-container> <PeopleView :item="people" :loading /></v-container>
</template>

<script setup>
const { $queries } = useNuxtApp()
const { fetchItem } = useFetchItem()
const loading = ref(true)
// Fetch the item
const { data: people } = await useAsyncData("item", async () => {
  return await fetchItem({
    query: $queries.people.get,
    key: "getPeople",
  })
})
loading.value = false
</script>

import { useRoute, useSetI18nParams, useNuxtApp } from "#imports"

type FetchItemPayload = {
  query: any
  key: string
  variables?: Record<string, any>
}

export const useFetchItem = () => {
  const fetchItem = async <T>({
    query,
    key,
    variables,
  }: FetchItemPayload): Promise<T> => {
    console.log("useFetchItem2 called with:", { query, key, variables })
    try {
      const { $apollo } = useNuxtApp()
      const route = useRoute()

      const apolloClient = $apollo?.clients?.default
      if (!apolloClient) throw new Error("Apollo client is not available")

      const { data } = await apolloClient.query({
        query,
        variables,
        fetchPolicy: "network-only",
      })

      const item = data?.[key]
      if (!item) throw new Error("Item not found in response")

      const setI18nParams = useSetI18nParams()
      if (!String(route.name ?? "").includes("people")) {
        setI18nParams({
          en: { slug: item.slug.en },
          fr: { slug: item.slug.fr },
        })
      } else {
        setI18nParams({
          en: { slug: item.slug },
          fr: { slug: item.slug },
        })
      }

      return item as T
    } catch (error) {
      console.error("Error fetching item:", error)
      throw error instanceof Error ? error : new Error(String(error))
    }
  }

  return { fetchItem }
}

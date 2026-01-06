import { useRoute, useI18n, useSetI18nParams, useNuxtApp } from "#imports"

export const useFetchItem = () => {
  const fetchItem = async <T>(payload: {
    query: string
    key: string
  }): Promise<T> => {
    try {
      const { locale } = useI18n()
      const route = useRoute()
      const { $apollo } = useNuxtApp()
      console.log("query: ", payload.query)
      console.log("key: ", payload.key)

      const variables = {
        itemId: route.params.slug?.toString().trim(),
        appId: "iea",
        lang: locale.value,
      }

      // Use the Apollo client directly via the clients property
      const apolloClient = $apollo?.clients?.default

      if (!apolloClient) {
        throw new Error("Apollo client is not available")
      }
      console.log("variables: ", variables)

      const { data } = await apolloClient.query({
        query: payload.query,
        variables,
      })
      /*  console.log("variables: ", variables) */
      console.log("data: ", data)

      const item = data?.[payload.key]
      /*      console.log("item: ", item) */

      if (!item) {
        throw new Error("Item not found in response")
      }
      // Update the slug in the i18n params
      // for people, the slug is the same in both languages
      // for other items, the slug is different in each language
      const setI18nParams = useSetI18nParams()
      if (!route.name.includes("people")) {
        /*  console.log("update params") */
        setI18nParams({
          en: { slug: item.slug.en },
          fr: { slug: item.slug.fr },
        })
      } else {
        // for people, the slug is the same in both languages
        setI18nParams({
          en: { slug: item.slug },
          fr: { slug: item.slug },
        })
      }
      return item as T
    } catch (error) {
      console.error("Error fetching item:", error)
      throw new Error(
        `Item not found: ${
          error instanceof Error ? error.message : String(error)
        }`,
      )
    }
  }

  return {
    fetchItem,
  }
}

type FetchItemPayload = {
  query: any
  key: string
  variables?: Record<string, any>
}

export const useFetchItem2 = () => {
  const fetchItem = async <T>({
    query,
    key,
    variables,
  }: FetchItemPayload): Promise<T> => {
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

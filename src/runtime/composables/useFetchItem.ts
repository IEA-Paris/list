import { useNuxtApp, useRoute, useSetI18nParams } from "#imports"

type FetchItemPayload = {
  query: any
  key: string
  variables?: Record<string, any>
}

export const useFetchItem = () => {
  // Capture composables synchronously during setup, before any await
  const { $apollo } = useNuxtApp()
  const route = useRoute()
  const setI18nParams = useSetI18nParams()

  const fetchItem = async <T>({
    query,
    key,
    variables,
  }: FetchItemPayload): Promise<T> => {
    try {
      const apolloClient = $apollo?.clients?.default
      if (!apolloClient) throw new Error("Apollo client is not available")

      const { data } = await apolloClient.query({
        query,
        variables,
        fetchPolicy: "network-only",
      })

      const item = data?.[key]
      if (!item) throw new Error("Item not found in response")

      // Best-effort: set localized slug params for the language switcher.
      // Runs after an await, so during SSR/prerender the Nuxt instance can be
      // unavailable ("[nuxt] instance unavailable") and setI18nParams throws.
      // That's non-fatal for rendering the item, so never let it fail the fetch.
      try {
        if (!String(route.name ?? "").includes("people")) {
          setI18nParams({
            en: { slug: item.slug?.en },
            fr: { slug: item.slug?.fr },
          })
        } else {
          setI18nParams({
            en: { slug: item.slug },
            fr: { slug: item.slug },
          })
        }
      } catch (i18nError) {
        console.warn("Skipping setI18nParams for item:", i18nError)
      }

      return item as T
    } catch (error) {
      console.error("Error fetching item:", error)
      throw error instanceof Error ? error : new Error(String(error))
    }
  }

  return { fetchItem }
}

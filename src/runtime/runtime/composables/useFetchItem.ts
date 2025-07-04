import { useRoute, useAsyncQuery, useI18n, useSetI18nParams } from "#imports";

export const useFetchItem = () => {
  const fetchItem = async <T>(payload: {
    query: string;
    key: string;
  }): Promise<T> => {
    try {
      const { locale } = useI18n();
      const route = useRoute();

      const variables = {
        itemId: route.params.slug?.toString().trim(),
        appId: "iea",
        lang: locale.value,
      };
      const { data, error } = await useAsyncQuery(payload.query, variables);
      /*  console.log("variables: ", variables) */

      if (error.value) {
        console.error("GraphQL error:", error.value);
        throw error.value;
      }

      const item = data?.value[payload.key];
      /*      console.log("item: ", item) */

      if (!item) {
        throw createError({
          statusCode: 404,
          message: "Item not found in response",
        });
      }
      // Update the slug in the i18n params
      // for people, the slug is the same in both languages
      // for other items, the slug is different in each language
      const setI18nParams = useSetI18nParams();
      if (!route.name.includes("people")) {
        /*  console.log("update params") */
        setI18nParams({
          en: { slug: item.slug.en },
          fr: { slug: item.slug.fr },
        });
      } else {
        // for people, the slug is the same in both languages
        setI18nParams({
          en: { slug: item.slug },
          fr: { slug: item.slug },
        });
      }
      return item as T;
    } catch (error) {
      console.error("Error fetching item:", error);
      throw createError({
        statusCode: 404,
        message: "Item not found",
        cause: error,
      });
    }
  };

  return {
    fetchItem,
  };
};

import { useNuxtApp } from "#imports"

export const formatDate = (dateStr: string, locale: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const getLocalizedDate = (dateIso: string): string => {
  const { $i18n } = useNuxtApp()
  return new Date(dateIso).toLocaleDateString(
    $i18n.localeProperties.value.language,
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  )
}

export const getDetailedFormatedDate = (
  dateStr: string,
  locale: string,
): {
  day: number
  month: string
  year: number
  hours: number
  minutes: number
} => {
  const date = new Date(dateStr)

  return {
    day: date.getDate(),
    month: date.toLocaleString(locale, { month: "long" }),
    year: date.getFullYear(),
    hours: date.getUTCHours(),
    minutes: date.getMinutes(),
  }
}

export const capitalize = (value: string, multiple?: boolean) =>
  multiple
    ? value.replace(/(?:^|[\s'-])\S/g, (a) => a.toUpperCase())
    : value && value.charAt(0).toUpperCase() + value.slice(1)

export const slugify = (str: string) => {
  str = str.replace(/^\s+|\s+$/g, "").trim() // trim
  str = str.toLowerCase()

  // remove accents, swap ñ for n, etc
  const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"
  const to = "aaaaeeeeiiiioooouuuunc------"
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes

  return str
}

export const formatDateValue = (
  date: string | Date,
  locale: string,
): string => {
  const formattedDate = new Date(date)
  return formattedDate.toLocaleDateString(locale)
}
export const highlightAndTruncate = (
  stop: number,
  text: string,
  query: string[],
): string => {
  try {
    if (!text) {
      return ""
    }
    // check that query exists, has an array and has elements inside
    if (query?.length && query[0]?.length) {
      // check if the text length is greater than the stop value
      if (text.length > stop) {
        /*      console.log("text bigger than stop, truncate", text.length, stop) */
        // map each query element to its matching index (if it exists)
        const indexes: number[] = query
          .map((element: string) => text.indexOf(element))
          .filter((index: number) => index !== -1)

        // check if matches have been found
        if (indexes.length) {
          // get the lowest index value
          const firstIndex = Math.min(...indexes)

          // check if the first index is greater than the stop value plus the length of the longest query string
          if (
            firstIndex >
            stop + Math.max(...query.map((element) => element.length))
          ) {
            // check if the first index is at the end of the string, if so, we split from the end
            if (text.length - firstIndex < stop) {
              text = "..." + text.substring(text.length - stop, text.length)
            } else {
              // if not, we shift the string to its start
              text =
                "..." + text.substring(firstIndex - 5, stop - 5 + firstIndex)
            }
          } else {
            text = text.slice(0, stop) + "..."
          }
        } else {
          // no match, let's just truncate
          text = text.slice(0, stop) + "..."
        }

        // highlight each query string in the text
        // query.forEach((element: string) => {
        //   const check = new RegExp(element, "gi")
        //   text = text.replace(check, function (matchedText: string) {
        //     return (
        //       '<strong style="color: white;background-color: black;">' +
        //       matchedText +
        //       "</strong>"
        //     )
        //   })
        // })
        query.forEach((element: string) => {
          const regex = new RegExp(element, "gi")
          text = text.replace(regex, (matchedText: string) => {
            return `<span style="
            text-decoration: underline;
            text-decoration-color: black;   
            text-decoration-thickness: 2px;
            text-underline-offset: 2px;
          ">${matchedText}</span>`
          })
        })
      } else {
        // highlight each query string in the text
        query.forEach((element: string) => {
          const check = new RegExp(element, "gi")
          text = text.replace(check, function (matchedText: string) {
            return (
              '<strong style="color: white;background-color: black;">' +
              matchedText +
              "</strong>"
            )
          })
        })
      }
    } else {
      // no search, let's just truncate
      text = text.slice(0, stop) + "..."
    }

    return text
  } catch (error: unknown) {
    console.log(error)
    return text // Return the original text if there's an error
  }
}

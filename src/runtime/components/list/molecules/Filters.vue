<template>
  <v-row>
    <template v-for="(filterItem, index) in Object.keys($stores[type].filters)">
      <v-col
        v-if="appAllowed(filterItem) && computeVisibility(filterItem)"
        :key="type + index + filterItem"
        cols="12"
        sm="6"
        md="4"
      >
        <component
          :is="ComponentName(filterItem)"
          :id="type + index + filterItem"
          tile
          :name="filterItem"
          hide-details
          :filter="true"
          :dense="smAndDown"
          :items="getItems(filterItem)"
          clearable
          :label="
            $t(
              'list.filters.' +
                (['disciplines', 'thematics'].includes(filterItem)
                  ? ''
                  : type + '.') +
                filterItem +
                '.label',
            )
          "
          min-height="56"
          variant="outlined"
          :loading="$stores[type].loading"
          :type="type"
          color="black"
          style="min-width: 150px"
          class="transition-swing pb-1"
        />
      </v-col>
    </template>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { capitalize } from "../../../composables/useUtils"
import { useNuxtApp, resolveComponent, useI18n, useAppConfig } from "#imports"

const { smAndDown } = useDisplay()
const i18n = useI18n()
const { locale, messages } = useI18n()
const { $stores, $filters } = useNuxtApp()
const props = defineProps(["type", "expanded"])

// Consuming app id. Filters may declare an `appId` array of the consumers
// allowed to render them; this is the id we match against. "all" is a wildcard.
const appId = useAppConfig().list?.appId ?? "iea"

// A filter is shown only on the consumers it opts into. No appId -> shown
// everywhere (backward compatible). "all" in the list matches any consumer.
const appAllowed = (filterKey) => {
  const allowed = $stores[props.type].filters[filterKey].appId
  if (!Array.isArray(allowed) || allowed.length === 0) return true
  return allowed.includes("all") || allowed.includes(appId)
}

const ComponentName = (name) => {
  return resolveComponent(
    "ListInputs" + capitalize($stores[props.type].filters[name].type),
  )
}
const getItems = (name) => {
  if ($stores[props.type].filters[name].type === "Checkbox") {
    return []
  }

  // Disciplines and thematics are shared enums used across most list types.
  // They live in their own top-level i18n namespace (list.filters.disciplines
  // / list.filters.thematics) and are resolved from there for every type,
  // independently of filters.json, to avoid duplicating them per type.
  if (["disciplines", "thematics"].includes(name)) {
    return Object.keys(messages.value[locale.value].list.filters?.[name])
      .filter((key) => key !== "label")
      .map((item) => ({
        title: i18n.t(`list.filters.${name}.${item}`),
        value: item,
      }))
      .sort((a, b) => a.title.localeCompare(b.title))
  }

  // Prefer the enum declared on the model filter (filters[name].items) over the
  // values baked into filters.json. The model is the source of truth for enum
  // options (e.g. publicationType), so filters.json never has to stay in sync.
  const modelItems = $stores[props.type].filters[name].items
  if (modelItems && typeof modelItems === "object") {
    return Object.values(modelItems)
      .filter((item) => item !== "label")
      .map((item) => ({
        title: i18n.t(`list.filters.${props.type}.${name}.${item}`),
        value: item,
      }))
  }

  if ($filters?.[props.type]?.[name]) {
    return $filters[props.type][name]
      .filter((key) => key !== "label")
      .map((item) => ({
        title: i18n.t(
          props.type === "people" && name === "vintage"
            ? item
            : `list.filters.${props.type}.${name}.${item}`,
        ),
        value: item,
      }))
  }

  if (!messages.value[locale.value].list.filters[props.type]?.[name]) {
    console.log(
      `translations missing for the filter ${name} of the type ${props.type}`,
    )
    return []
  }
  // TODO replace with package based values
  return Object.keys(
    messages.value[locale.value].list.filters[props.type][name],
  )
    .filter((key) => key !== "label")
    .map((item) => ({
      title: i18n.t(`list.filters.${props.type}.${name}.${item}`),
      value: item,
    }))
}

// const computeVisibility = (filterItem) => {
//   return (
//     // if anything is set in the visibility key
//     !$stores[props.type].filters[filterItem].visibility ||
//     $stores[props.type].filters[filterItem].visibility?.default ||
//     $stores[props.type].filters[filterItem].visibility?.switchIf.find(
//       // for each of the rules set in the switchIf key
//       (rule) => {
//         // we check if each of the condition are fulfilled
//         return Object.keys(rule).find((value, _index, _obj) => {
//           return $stores[props.type].filters[value].multiple
//             ? $stores[props.type].filters[value]?.value &&
//                 $stores[props.type].filters[value]?.value.includes(rule[value])
//             : $stores[props.type].filters[value]?.value === rule[value]
//         })
//       },
//     )
//   )
// }

const computeVisibility = (filterKey) => {
  const filters = $stores[props.type].filters
  const show = filters?.[filterKey]?.show

  // No show config -> always visible.
  if (!show) return true

  const def = show.default === true

  // Without switch rules, visibility is simply the default.
  if (!Array.isArray(show.switchIf) || show.switchIf.length === 0) return def

  const checkRule = (rule) =>
    Object.entries(rule).every(([depKey, expected]) => {
      // Reserved key: match against the active view modifier rather than a
      // sibling filter's value. On routes like /resources/media the `type` is
      // narrowed server-side via the modifier, so the modifier is what changes.
      if (depKey === "modifier") {
        const cur = $stores[props.type].modifier
        return Array.isArray(expected)
          ? expected.includes(cur)
          : cur === expected
      }

      const dep = filters?.[depKey]
      if (!dep) return false
      const cur = dep.value

      if (dep.multiple) {
        if (!Array.isArray(cur)) return false
        return Array.isArray(expected)
          ? expected.some((e) => cur.includes(e))
          : cur.includes(expected)
      }
      return Array.isArray(expected) ? expected.includes(cur) : cur === expected
    })

  // disjonctive (default true) -> any rule matches; otherwise all rules match.
  const matched =
    show.disjonctive !== false
      ? show.switchIf.some(checkRule)
      : show.switchIf.every(checkRule)

  // A matched switch flips the default; otherwise keep the default.
  return matched ? !def : def
}
</script>

<style lang="scss" scoped></style>

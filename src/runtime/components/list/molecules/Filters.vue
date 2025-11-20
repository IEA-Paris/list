<template>
  <v-row>
    <template v-for="(filterItem, index) in Object.keys($stores[type].filters)">
      <v-col
        v-if="computeVisibility(filterItem)"
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
          :label="$t('list.filters.' + type + '.' + filterItem + '.label')"
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
import { useNuxtApp, resolveComponent, useI18n } from "#imports"

const { smAndDown } = useDisplay()
const i18n = useI18n()
const { locale, messages } = useI18n()
const { $stores, $filters } = useNuxtApp()
const props = defineProps(["type", "expanded"])

const ComponentName = (name) => {
  return resolveComponent(
    "ListInputs" + capitalize($stores[props.type].filters[name].type)
  )
}
const getItems = (name) => {
  if ($stores[props.type].filters[name].type === "Checkbox") {
    return []
  }

  if ($filters?.[props.type]?.[name]) {
    return $filters[props.type][name]
      .filter((key) => key !== "label")
      .map((item) => ({
        title: i18n.t(
          props.type === "people" && name === "vintage"
            ? item
            : `list.filters.${props.type}.${name}.${item}`
        ),
        value: item,
      }))
  }
  if (
    messages.value[locale.value].list.filters[props.type][name] === undefined
  ) {
    console.log("name not found, no item for this filter: ", name)
    return []
  }
  // TODO replace with package based values
  return Object.keys(
    messages.value[locale.value].list.filters[props.type][name]
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

  if (!show) return true
  if (show.default) return true
  if (!Array.isArray(show.switchIf)) return false

  const checkRule = (rule) =>
    Object.entries(rule).every(([depKey, expected]) => {
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

  return show.disjonctive !== false
    ? show.switchIf.some(checkRule)
    : show.switchIf.every(checkRule)
}
</script>

<style lang="scss" scoped></style>

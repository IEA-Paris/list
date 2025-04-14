<template>
  <v-row>
    <template v-for="filterItem in Object.keys($stores[type].filters)">
      <v-col
        v-if="computeVisibility(filterItem)"
        :key="type + filterItem"
        cols="12"
        sm="6"
        md="4"
      >
        <component
          :is="ComponentName(filterItem)"
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
        <!--    <template
      v-else
      v-for="filterItem in Object.keys(rootStore[type].list.filters).slice()"
    >
      <div v-if="computeVisibility(filterItem)">
        {{ filterItem }}
      </div>
    </template> -->
      </v-col>
    </template>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify";
import { useRootStore } from "../../../stores/root";
import { capitalize } from "../../../composables/useUtils";
import { useNuxtApp, onMounted, resolveComponent, useI18n } from "#imports";

const { smAndDown } = useDisplay();
const i18n = useI18n();
const { locale, messages } = useI18n();
const { $stores } = useNuxtApp();
const rootStore = useRootStore();
const props = defineProps(["type", "expanded"]);

const ComponentName = (name) => {
  return resolveComponent(
    "ListInputs" + capitalize($stores[props.type].filters[name].type)
  );
};
const getItems = (name) => {
  if ($stores[props.type].filters[name].type === "Checkbox") {
    return [];
  }
  if (
    messages.value[locale.value].list.filters[props.type][name] === undefined
  ) {
    console.log("name not found, no item for this filmter: ", name);
    return [];
  }
  // TODO replace with package based values
  return Object.keys(
    messages.value[locale.value].list.filters[props.type][name]
  )
    .filter((key) => key !== "label")
    .map((item) => ({
      title: i18n.t(`list.filters.${props.type}.${name}.${item}`),
      value: item,
    }));
};
onMounted(() => {
  rootStore.loadRouteQuery(props.type);
});

const computeVisibility = (filterItem) => {
  return (
    // if anything is set in the visibility key
    !$stores[props.type].filters[filterItem].visibility ||
    $stores[props.type].filters[filterItem].visibility?.default ||
    $stores[props.type].filters[filterItem].visibility?.switchIf.find(
      // for each of the rules set in the switchIf key
      (rule) => {
        // we check if each of the condition are fulfilled
        return Object.keys(rule).find((value, index, obj) => {
          return $stores[props.type].filters[value].multiple
            ? $stores[props.type].filters[value]?.value &&
                $stores[props.type].filters[value]?.value.includes(rule[value])
            : $stores[props.type].filters[value]?.value === rule[value];
        });
      }
    )
  );
};
</script>

<style lang="scss" scoped></style>

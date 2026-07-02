import { defineStore } from "pinia"
import { reactive, toRefs } from "vue"

// The trees models are exported deep-frozen (selectiveDeepFreeze): the `filters`
// container and every filter entry are frozen, with only each entry's `.value`
// left writable. Vue's `reactive()` returns frozen objects UNPROXIED, so if we
// spread the model in as-is, `$stores[type].filters` is the raw frozen object
// and mutating `filters[key].value` (in updateFilter) is never tracked — the
// query `variables` computed never re-runs and the selected filters never reach
// the backend. Deep-cloning into a fully-mutable copy first lets Vue proxy it so
// filter mutations are reactive. Mirrors the structuredClone already used by
// rootStore.resetState.
const toMutable = <T>(value: T): T => {
  try {
    return structuredClone(value)
  } catch {
    // Fallback for anything not structured-cloneable (models are plain
    // JSON-derived data, so this practically never triggers).
    return JSON.parse(JSON.stringify(value))
  }
}

export const createDynamicStore = (storeName: string, moduleState: object) => {
  return defineStore(storeName, () => {
    const state = reactive({
      loading: false,
      total: 0,
      skip: 0,
      page: 1,
      numberOfPages: 0,
      search: "",
      error: null as string | null,
      sortKey: null as string | null,
      ...toMutable(moduleState),
    })
    return {
      ...toRefs(state),
    }
  })
}

import { describe, it, expect, beforeEach } from "vitest"
import { setActivePinia, createPinia } from "pinia"
import { computed, watch, nextTick } from "vue"
import { createDynamicStore } from "../src/runtime/stores/factory"

// Reproduce how @paris-ias/trees ships its list models: deep-frozen, with only
// each filter entry's `.value` left writable (selectiveDeepFreeze / lockAllBut).
// If the store factory seeds `reactive()` with this frozen object directly, Vue
// refuses to proxy it and filter `.value` mutations are never tracked — which is
// exactly the bug that stopped selected filters from reaching the backend.
const lockAllBut = (obj: Record<string, unknown>, mutableKeys: string[] = []) => {
  for (const key of Object.getOwnPropertyNames(obj)) {
    if (mutableKeys.includes(key)) continue
    const desc = Object.getOwnPropertyDescriptor(obj, key)!
    Object.defineProperty(
      obj,
      key,
      "value" in desc
        ? { ...desc, writable: false, configurable: false }
        : { ...desc, configurable: false },
    )
  }
  Object.preventExtensions(obj)
  return obj
}

const buildFrozenModel = () => {
  const model = {
    filters: {
      status: lockAllBut({ type: "Select", multiple: false, value: "" }, ["value"]),
      disciplines: lockAllBut(
        { type: "AutoComplete", multiple: true, value: "" },
        ["value"],
      ),
    },
  }
  Object.freeze(model.filters)
  Object.freeze(model)
  return model
}

describe("createDynamicStore + frozen trees model", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("exposes filters as a mutable reactive proxy, not the raw frozen model", () => {
    const model = buildFrozenModel()
    const store = createDynamicStore("projects", model)()
    // The store must NOT alias the frozen source object.
    expect(store.filters).not.toBe(model.filters)
    expect(Object.isFrozen(store.filters)).toBe(false)
  })

  it("tracks filter .value mutations so a dependent computed re-runs", async () => {
    const model = buildFrozenModel()
    const store = createDynamicStore("projects", model)()

    // Mirror buildListVariables: collect non-empty filter values.
    const built = computed(() => {
      const out: Record<string, unknown> = {}
      const filters = store.filters as Record<string, { value: unknown }>
      for (const key in filters) {
        const v = filters[key]?.value
        if (v !== "" && v != null && !(Array.isArray(v) && v.length === 0)) {
          out[key] = v
        }
      }
      return out
    })

    let reruns = 0
    watch(built, () => reruns++)

    expect(built.value).toEqual({})

    // Mirror updateFilter: write straight to the entry's `.value`.
    ;(store.filters as Record<string, { value: unknown }>).status.value = "FINISHED"
    await nextTick()

    expect(reruns).toBeGreaterThan(0)
    expect(built.value).toEqual({ status: "FINISHED" })
  })
})

import { defineStore } from "pinia"
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
      ...moduleState,
    })

    return {
      ...toRefs(state),
    }
  })
}

import { events } from "~/stores/factory" // Import your store types

declare module "#app" {
  interface NuxtApp {
    $stores: {
      events: ReturnType<typeof createDynamicStore<"events">>
      news: ReturnType<typeof createDynamicStore<"news">>
      // Add other store types...
    }
  }
}

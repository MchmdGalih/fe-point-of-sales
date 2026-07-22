import { createPersistedState } from "pinia-plugin-persistedstate";

export const piniaPersistedState = createPersistedState({
  storage: localStorage,
  serializer: {
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  },
});

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/authSlice";
import { api } from "./api/apiSlice";
import { persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["auth"],
};
const appReuducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
});
const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return appReuducer(state, action);
};
const persistedAuthReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedAuthReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
        ],
      },
    }).concat(api.middleware),
});
export const persistor = persistStore(store);

export default store;

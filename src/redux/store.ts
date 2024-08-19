import { combineReducers, configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { initReducer } from "./init";
import { authReducer } from "./auth";
import { caveReducer } from "./cave";
import { droneReducer } from "./drone";

axios.defaults.baseURL = "https://cave-drone-server.shtoa.xyz";

const statisticsPersistConfig = {
  key: "root",
  storage,
  whitelist: ["statistics"],
};

export const reducer = combineReducers({
  init: persistReducer(statisticsPersistConfig, initReducer),
  auth: authReducer,
  cave: caveReducer,
  drone: droneReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

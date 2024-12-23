import { configureStore } from "@reduxjs/toolkit";
import preferencesReducer from "./features/preferencesSlice";

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
  },
});

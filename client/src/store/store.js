import { configureStore } from "@reduxjs/toolkit";
import testSlice from "./testSlice";
import filterSlice from "./filterSlice";
export const store = configureStore({
  reducer: {
    testStore: testSlice,
    filterStore: filterSlice,
  },
});
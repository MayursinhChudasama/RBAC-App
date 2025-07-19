import { configureStore } from "@reduxjs/toolkit";
import { dataSlice } from "./dataSlice";

export const store = configureStore<{
  data: ReturnType<typeof dataSlice.reducer>;
}>({
  reducer: {
    data: dataSlice.reducer,
  },
});

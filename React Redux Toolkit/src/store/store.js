import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./uiSlice";
import { dataSlice } from "./dataSlice";
import { dataApi } from "./dataApiSlice";
import { data } from "react-router-dom";

// const store = configureStore({
//   reducer: { ui: uiSlice.reducer, data: dataSlice.reducer },
// });

export const store = configureStore({
  reducer: {
    dataApi: dataApi.reducer,
    ui: uiSlice.reducer,
    data: dataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dataApi.middleware),
});

export default store;

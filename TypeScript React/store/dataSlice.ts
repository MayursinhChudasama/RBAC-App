import { createSlice } from "@reduxjs/toolkit";
import { initialData } from "./initialData";
import { Data } from "../models/dataModel";

export const dataSlice = createSlice({
  name: "data",
  initialState: initialData,
  reducers: {
    getAllData() {},
    getCurrentData() {},
  },
});

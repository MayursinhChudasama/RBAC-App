import { createSlice } from "@reduxjs/toolkit";
import { useFetchDataQuery } from "./dataApiSlice";

// const dataInitialState = {
//   data: { Users: [], Roles: [], Permissions: [], Todos: [] },
// };

export const dataSlice = createSlice({
  name: "data",
  initialState: [],
  reducers: {
    setData(state, action) {
      return action.payload;
      //   state[action.payload.key] = action.payload.data;
    },
  },
});

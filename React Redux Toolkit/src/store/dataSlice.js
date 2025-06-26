import { createSlice } from "@reduxjs/toolkit";
import { useFetchDataQuery } from "./dataApiSlice";

const dataInitialState = {
  users: ["ID", "Name", "Email", "Password", "Role", "Todos", "Action"],
  roles: ["ID", "Name", "Permission", "Action"],
  permissions: ["ID", "Name", "Type", "Action"],
  todos: ["ID", "Title", "Status", "Action"],
};

export const dataSlice = createSlice({
  name: "data",
  initialState: dataInitialState,
  reducers: {
    setData(state, action) {
      return action.payload;
      //   state[action.payload.key] = action.payload.data;
    },
  },
});

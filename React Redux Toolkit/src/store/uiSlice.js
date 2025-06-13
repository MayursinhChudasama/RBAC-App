import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = {
  isNavOpen: false,
  isDropdownOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: uiInitialState,
  reducers: {
    openNav(state) {
      state.isNavOpen = true;
    },
    closeNav(state) {
      state.isNavOpen = false;
    },
    openDropdown(state) {
      state.isDropdownOpen = true;
    },
    closeDropDown(state) {
      state.isDropdownOpen = false;
    },
  },
});

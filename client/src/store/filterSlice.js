import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchContent: "",
  country: "",
  category: "",
  status: "",
};

const languageSlice = createSlice({
  name: "languageSlice",
  initialState: initialState,
  reducers: {
    updateContent(state, action) {
      state.searchContent = action.payload.searchContent;
    },
    updateCountry(state, action) {
      state.country = action.payload.country;
    },
    updateCategory(state, action) {
      state.category = action.payload.category;
    },
    updateStatus(state, action) {
      state.status = action.payload.status;
    },
  },
});

export const { updateContent, updateCountry, updateCategory, updateStatus } =
  languageSlice.actions;
export default languageSlice.reducer;

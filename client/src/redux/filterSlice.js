// redux/filterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
  subCategory: [],
  sortType: "relevant", // More user-friendly default
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryFilter: (state, action) => {
      const value = action.payload;
      if (state.category.includes(value)) {
        state.category = state.category.filter((cat) => cat !== value);
      } else {
        state.category.push(value);
      }
    },
    setSubCategoryFilter: (state, action) => {
      const value = action.payload;
      if (state.subCategory.includes(value)) {
        state.subCategory = state.subCategory.filter((sub) => sub !== value);
      } else {
        state.subCategory.push(value);
      }
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const { setCategoryFilter, setSubCategoryFilter, setSortType } =
  filterSlice.actions;
export default filterSlice.reducer;

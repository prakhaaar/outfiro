// redux/slices/shopSlice.js
import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial state for the shop slice
 */
const initialState = {
  search: "", // Search query string
  showSearch: true, // Boolean to control search bar visibility
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    /**
     * Sets the search term
     * @param {Object} state
     * @param {Object} action
     */
    setSearch: (state, action) => {
      state.search = action.payload;
    },

    /**
     * Controls the visibility of the search bar
     * @param {Object} state
     * @param {Object} action
     */
    setShowSearch: (state, action) => {
      state.showSearch = action.payload;
    },

    /**
     * Resets the search term to default
     * @param {Object} state
     */
    resetSearch: (state) => {
      state.search = "";
    },
  },
});

// Export actions
export const { setSearch, setShowSearch, resetSearch } = shopSlice.actions;

// Export reducer
export default shopSlice.reducer;

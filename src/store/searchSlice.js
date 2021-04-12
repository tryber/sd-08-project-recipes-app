import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    isSearching: false,
  },
  reducers: {
    toggleSearch: (state) => ({ isSearching: !state.isSearching }),
  },
});

export const { toggleSearch } = searchSlice.actions;

export default searchSlice.reducer;

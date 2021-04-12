import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk(
  'api/fetchCategories',
  async (endPoint) => {
    const categories = await fetch(endPoint)
      .then((response) => response.json());
    return categories;
  },
);

const apiCategoriesSlice = createSlice({
  name: 'api',
  initialState: {
    categories: [],
    loading: 'idle',
  },
  reducers: {},
  extraReducers: {
    [fetchCategories.pending]: (state) => ({ ...state, loading: 'pending' }),
    [fetchCategories.fulfilled]: (state, action) => ({
      categories: action.payload, loading: 'fulfilled',
    }),
    [fetchCategories.rejected]: (state) => ({ ...state, loading: 'rejected' }),
  },
});

export default apiCategoriesSlice.reducer;

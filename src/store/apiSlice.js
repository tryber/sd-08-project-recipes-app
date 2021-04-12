import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const request = async (endPoint) => {
  const data = await fetch(endPoint)
    .then((response) => response.json());
  return data;
};

export const fetchItem = createAsyncThunk(
  'api/fetchItem',
  async (endPoint) => request(endPoint),
);

const mainReducers = {
  [fetchItem.pending]: (state) => ({ ...state, loading: 'pending' }),
  [fetchItem.fulfilled]: (state, action) => ({
    ...state, data: action.payload, loading: 'fulfilled',
  }),
  [fetchItem.rejected]: (state) => ({ ...state, loading: 'rejected' }),
};

export const fetchRecommend = createAsyncThunk(
  'api/fetchRecommend',
  async (endPoint) => request(endPoint),
);

const recommendReducers = {
  [fetchRecommend.pending]: (state) => ({ ...state, recommendLoading: 'pending' }),
  [fetchRecommend.fulfilled]: (state, action) => ({
    ...state, recommendData: action.payload, recommendLoading: 'fulfilled',
  }),
  [fetchRecommend.rejected]: (state) => ({ ...state, recommendLoading: 'rejected' }),
};

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    data: 'SN',
    recommendData: [],
    loading: 'idle',
    recommendLoading: 'idle',
    explore: '',
  },
  reducers: {
    explore: (state, action) => ({
      ...state,
      explore: action.payload,
    }),
  },
  extraReducers: {
    ...mainReducers,
    ...recommendReducers,
  },
});

export const { explore } = apiSlice.actions;

export default apiSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    redirect: false,
  },
  reducers: {
    setRedirect: (state) => ({ redirect: !state.redirect }),
  },
});

export const { setRedirect } = loginSlice.actions;

export default loginSlice.reducer;

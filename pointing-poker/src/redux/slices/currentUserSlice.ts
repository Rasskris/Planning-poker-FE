import { createSlice } from '@reduxjs/toolkit';
import { CurrentUser } from '../../interfaces';
import { addUser } from '../thunks';

const initialState: CurrentUser = {
  isLogin: false,
  user: null,
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    deleteCurrentUser: state => {
      state.isLogin = false;
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(addUser.fulfilled, (state, { payload }) => {
      state.isLogin = true;
      state.user = payload;
    });
  },
});

export const { deleteCurrentUser } = currentUserSlice.actions;
export const currentUserReducer = currentUserSlice.reducer;

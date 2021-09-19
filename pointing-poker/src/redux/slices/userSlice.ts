import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../interfaces';

// TODO remake add AsyncThunk

interface InitState {
  isLogin: boolean;
  user: null | User;
}

const initialState: InitState = {
  isLogin: false,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action) {
      state.user = { ...action.payload };
    },
    addRole(state, action) {
      state.user.role = action.payload;
    },
    isLogin(state, action) {
      state.isLogin = action.payload;
    },
  },
});

export const { addUser, addRole, isLogin } = userSlice.actions;
export const userReducer = userSlice.reducer;

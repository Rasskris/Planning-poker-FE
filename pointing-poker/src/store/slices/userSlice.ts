import { UserRole } from '../../interfaces/UserRole';
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  firstName: string;
  lastName: string;
  jobPosition: string;
  image: string;
  observer: boolean;
  role: UserRole;
  isLogin?: boolean;
}

const initialUserState: { user: UserState; isLogin: boolean } = {
  user: {
    firstName: '',
    lastName: '',
    jobPosition: '',
    image: '',
    observer: false,
    role: UserRole.none,
  },
  isLogin: false,
};
export const UserSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    addUser(state, action) {
      state.user = { ...action.payload };
    },
    addRole(state, action) {
      state.user.role = action.payload;
    },
    addObserver(state, action) {
      state.user.observer = action.payload;
    },
    isLogin(state, action) {
      state.isLogin = action.payload;
    },
  },
});

export const { addUser, addRole, addObserver, isLogin } = UserSlice.actions;
export default UserSlice.reducer;

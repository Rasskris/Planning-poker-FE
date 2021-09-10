import { UserRole } from '../../interfaces/UserRole';
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  firstName: string;
  lastName: string;
  jobPosition: string;
  image: string;
  observer: boolean;
  role: UserRole;
}

const initialUserState: UserState = {
  firstName: '',
  lastName: '',
  jobPosition: '',
  image: '',
  observer: false,
  role: UserRole.none,
};
export const UserSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    addUser(state, action) {
      state = { ...action.payload.user };
    },
  },
});

export const { addUser } = UserSlice.actions;
export default UserSlice.reducer;

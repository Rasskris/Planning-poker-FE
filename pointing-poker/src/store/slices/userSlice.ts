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

const initialUserState: { user: UserState } = {
  user: {
    firstName: '',
    lastName: '',
    jobPosition: '',
    image: '',
    observer: false,
    role: UserRole.none,
  },
};
export const UserSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    addUser(state, action) {
      state.user = { ...action.payload };
    },
  },
});

export const { addUser } = UserSlice.actions;
export default UserSlice.reducer;

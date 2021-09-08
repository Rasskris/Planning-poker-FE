import { UserRole } from '../interfaces/UserRole';
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  firstName: string;
  lastName: string;
  jobPosition: string;
  image: string;
  observer: boolean;
  role: UserRole;
}

const initialUserState: { users: UserState[] } = {
  users: [],
};
export const UserSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    addUser(state, action) {
      console.log(state);
      console.log(action);
      state.users.push({ ...action.payload.user });
    },
  },
});

export const { addUser } = UserSlice.actions;
export default UserSlice.reducer;

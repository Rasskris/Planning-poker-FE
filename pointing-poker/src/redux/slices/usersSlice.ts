import { createSlice } from '@reduxjs/toolkit';
import { usersAdapter } from '../adapters';
import { getUsers, addUser, deleteUser } from '../thunks';

const initialState = usersAdapter.getInitialState();

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        usersAdapter.addMany(state, payload.users);
      })
      .addCase(addUser.fulfilled, (state, { payload }) => {
        usersAdapter.addOne(state, payload);
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        usersAdapter.removeOne(state, payload);
      });
  },
});

export const usersReducer = usersSlice.reducer;

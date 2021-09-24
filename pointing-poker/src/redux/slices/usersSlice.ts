import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces';
import { usersAdapter } from '../adapters';
import { getUsers, addUser, deleteUser, putVoteForKick } from '../thunks';

const initialState = usersAdapter.getInitialState();

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    memberJoin: (state, { payload }: PayloadAction<IUser>) => {
      usersAdapter.addOne(state, payload);
    },
  },
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
      })
      .addCase(putVoteForKick.fulfilled, (state, { payload }) => {
        if (payload.success) {
          usersAdapter.removeOne(state, payload.id);
        }
      });
  },
});

export const { memberJoin } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addVote } from '../thunks';
import { User } from '../../interfaces';

interface Vote {
  availible: boolean;
  notAvailible: boolean;
  isActive: boolean;
  victim: null | User;
  userOpenedVote: string;
}

const initialState: Vote = {
  availible: false,
  notAvailible: false,
  isActive: false,
  victim: null,
  userOpenedVote: '',
};

export const voteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {
    enableVote: (state, { payload }: PayloadAction<{ currentUserId: string; victim: User }>) => {
      state.isActive = true;
      state.victim = payload.victim;
      state.userOpenedVote = payload.currentUserId;
    },
    disableVote: state => {
      state.isActive = false;
      state.victim = null;
    },
    resetAvailibleStatus: state => {
      state.availible = false;
      state.notAvailible = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(addVote.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.availible = true;
      } else {
        state.notAvailible = true;
      }
    });
  },
});

export const { enableVote, disableVote, resetAvailibleStatus } = voteSlice.actions;

export const voteReducer = voteSlice.reducer;

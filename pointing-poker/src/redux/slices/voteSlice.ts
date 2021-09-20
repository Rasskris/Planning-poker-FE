import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../interfaces';

interface Vote {
  isEnable: boolean;
  victim: null | User;
}

const initialState: Vote = {
  isEnable: false,
  victim: null,
};

export const voteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {
    enableVote: (state, { payload }: PayloadAction<User>) => {
      state.isEnable = true;
      state.victim = payload;
    },
    disableVote: state => {
      state.isEnable = false;
      state.victim = null;
    },
  },
});

export const { enableVote } = voteSlice.actions;

export const voteReducer = voteSlice.reducer;

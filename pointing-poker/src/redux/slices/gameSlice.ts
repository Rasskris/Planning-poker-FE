import { createSlice } from '@reduxjs/toolkit';
import { updateGameStatus } from '../thunks';

interface Game {
  isStarded: boolean;
  isMemberJoined: boolean;
  isMemberLeft: boolean;
}

const initialState: Game = {
  isStarded: false,
  isMemberJoined: false,
  isMemberLeft: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setMemberJoinedStatus: state => {
      state.isMemberJoined = true;
    },
    resetMemberJoinedStatus: state => {
      state.isMemberJoined = false;
    },
    setMemberLeftStatus: state => {
      state.isMemberLeft = true;
    },
    resetMemberLeftStatus: state => {
      state.isMemberLeft = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(updateGameStatus.fulfilled, (state, { payload }) => {
      state.isStarded = payload;
    });
  },
});

export const { setMemberJoinedStatus, setMemberLeftStatus, resetMemberJoinedStatus, resetMemberLeftStatus } =
  gameSlice.actions;

export const gameReducer = gameSlice.reducer;

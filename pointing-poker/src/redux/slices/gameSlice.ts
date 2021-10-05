import { createSlice } from '@reduxjs/toolkit';
import { checkExistGame, updateGameStatus } from '../thunks';

interface IGame {
  isExist: boolean | null;
  isStarded: boolean;
  isNewUserJoined: boolean;
  isNewUserLeft: boolean;
}

const initialState: IGame = {
  isExist: null,
  isStarded: false,
  isNewUserJoined: false,
  isNewUserLeft: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setNewUserJoinedStatus: state => {
      state.isNewUserJoined = true;
    },
    resetNewUserJoinedStatus: state => {
      state.isNewUserJoined = false;
    },
    setNewUserLeftStatus: state => {
      state.isNewUserLeft = true;
    },
    resetNewUserLeftStatus: state => {
      state.isNewUserLeft = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(checkExistGame.fulfilled, (state, { payload }) => {
        state.isExist = payload.isExistGame;
      })
      .addCase(updateGameStatus.fulfilled, (state, { payload }) => {
        state.isStarded = payload;
      });
  },
});

export const { setNewUserJoinedStatus, resetNewUserJoinedStatus, setNewUserLeftStatus, resetNewUserLeftStatus } =
  gameSlice.actions;
export const gameReducer = gameSlice.reducer;

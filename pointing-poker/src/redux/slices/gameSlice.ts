import { createSlice } from '@reduxjs/toolkit';
import { checkExistGame, updateGameStatus } from '../thunks';

interface IGame {
  isExist: boolean | null;
  isStarded: boolean;
}

const initialState: IGame = {
  isExist: null,
  isStarded: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
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

export const gameReducer = gameSlice.reducer;

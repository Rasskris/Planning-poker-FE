import { createSlice } from '@reduxjs/toolkit';
import { checkExistGame } from '../thunks';

interface Game {
  isExist: boolean | null;
  isStarded: boolean;
}

const initialState: Game = {
  isExist: null,
  isStarded: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(checkExistGame.fulfilled, (state, { payload }) => {
      state.isExist = payload.isExistGame;
    });
  },
});

export const gameReducer = gameSlice.reducer;

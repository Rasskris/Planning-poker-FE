import { createSlice } from '@reduxjs/toolkit';
import { IGameRoundData } from '../../interfaces';
import { addGameRoundData, getDataAllRoomsOfGame, updateUserGameCard } from '../thunks';

interface IObjectType {
  [index: string]: string | null;
}

const initialGameRoundState: IGameRoundData = {
  timerIsStarted: false,
  currentIssue: '',
  playerCards: {} as IObjectType,
  roundStatistics: {} as IObjectType,
  isActive: true,
};

export const gameRoundSlice = createSlice({
  name: 'gameRound',
  initialState: initialGameRoundState,
  reducers: {
    startGameRound(state, action) {
      const newState = { ...state, ...action.payload };
      return newState;
    },
    updateGameRoundData(state, action) {
      const newState = { ...state, ...action.payload };
      return newState;
    },
  },
  extraReducers: builder => {
    builder.addCase(updateUserGameCard.fulfilled, (state, action) => {
      const newState = { ...state, ...action.payload };
      return newState;
    });
    builder.addCase(addGameRoundData.fulfilled, (state, action) => {
      const newState = { ...state, ...action.payload };
      return newState;
    });
    builder.addCase(getDataAllRoomsOfGame.fulfilled, (state, action) => {});
  },
});

export const { startGameRound, updateGameRoundData } = gameRoundSlice.actions;
export const gameRoundReducer = gameRoundSlice.reducer;

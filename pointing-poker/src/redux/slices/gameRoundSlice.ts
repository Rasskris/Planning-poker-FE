import { createSlice } from '@reduxjs/toolkit';
import { IGameRoundData } from '../../interfaces';
import {
  addGameRoundData,
  getDataAllRoomsOfGame,
  getRoundStatistic,
  updateGameRoundStatistics,
  updateUserGameCard,
} from '../thunks';

interface IObjectType {
  [index: string]: string | null;
}

const initialGameRoundState: IGameRoundData = {
  roundIsStarted: false,
  currentIssue: '',
  playerCards: {} as IObjectType,
  roundStatistics: {} as IObjectType,
  isActive: true,
  //TO DO: add cardTypeValue
};

export const gameRoundSlice = createSlice({
  name: 'gameRound',
  initialState: initialGameRoundState,
  reducers: {
    // only used when called by socket
    startGameRound(state, action) {
      const newState = { ...state, ...action.payload };
      return newState;
    },
    // only used when called by socket
    updateGameRoundData(state, action) {
      const newState = { ...state, ...action.payload };
      return newState;
    },
    // only used when called by socket
    setRoundStatisticFromServer(state, action) {
      state.roundStatistics = { ...action.payload };
    },
    stopGameRound(state) {
      state.isActive = false;
      state.roundIsStarted = false;
    },
    updateRoundStatistics(state, action) {
      state.roundStatistics = { ...action.payload };
    },
    resetGameRoundData(state) {
      return { ...initialGameRoundState };
    },
    setCurrentIssue(state, action) {
      state.currentIssue = action.payload;
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
    builder.addCase(updateGameRoundStatistics.fulfilled, state => {
      return { ...initialGameRoundState };
    });
    builder.addCase(getRoundStatistic.fulfilled, (state, action) => {
      state.roundStatistics = { ...action.payload };
    });
  },
});

export const {
  startGameRound,
  updateGameRoundData,
  stopGameRound,
  updateRoundStatistics,
  resetGameRoundData,
  setRoundStatisticFromServer,
  setCurrentIssue,
} = gameRoundSlice.actions;
export const gameRoundReducer = gameRoundSlice.reducer;

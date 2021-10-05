import { createSlice } from '@reduxjs/toolkit';
import { IGameRoundData } from '../../interfaces';
import { IObjectType } from '../../interfaces/IObjectType';
import {
  addGameRoundData,
  deleteGameRoundData,
  resetGameRoundDataThunk,
  updateGameRoundStatistics,
  updateUserGameCard,
} from '../thunks';

const initialGameRoundState: IGameRoundData = {
  roundIsStarted: false,
  currentIssue: '',
  playerCards: {} as IObjectType,
  roundStatistics: {} as IObjectType,
  isActive: true,
  scoreTypeValue: '',
  timeLeft: {
    minutes: 0,
    seconds: 0,
  },
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
      state.playerCards = action.payload;
    },
    // only used when called by socket
    setRoundStatisticFromServer(state, action) {
      state.roundStatistics = { ...action.payload };
    },
    // only used when called by socket
    resetGameRoundData(state) {
      const newState = { ...initialGameRoundState };
      return newState;
    },
    stopGameRound(state) {
      state.isActive = false;
      state.roundIsStarted = false;
    },
    updateRoundStatistics(state, action) {
      state.roundStatistics = action.payload;
    },
    setCurrentIssue(state, action) {
      state.currentIssue = action.payload;
    },
    deleteCurrentIssue(state, action) {
      if (state.currentIssue === action.payload) state.currentIssue = '';
    },
    resetGameRoundStatistics(state) {
      state.roundStatistics = initialGameRoundState.roundStatistics;
    },
    updateTimer(state, action) {
      state.timeLeft = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(updateUserGameCard.fulfilled, (state, action) => {
      state.playerCards = action.payload;
    });
    builder.addCase(addGameRoundData.fulfilled, (state, action) => {
      const newState = { ...state, ...action.payload };
      return newState;
    });
    builder.addCase(updateGameRoundStatistics.fulfilled, (state, action) => {
      state.roundStatistics = action.payload;
    });
    builder.addCase(deleteGameRoundData.fulfilled, (state, action) => {});
    builder.addCase(resetGameRoundDataThunk.fulfilled, state => {
      const currentIssue = state.currentIssue;
      return { ...initialGameRoundState, currentIssue };
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
  deleteCurrentIssue,
  resetGameRoundStatistics,
  updateTimer,
} = gameRoundSlice.actions;
export const gameRoundReducer = gameRoundSlice.reducer;

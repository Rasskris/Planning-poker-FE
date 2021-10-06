import { createSlice } from '@reduxjs/toolkit';
import { IGameRoundData } from '../../interfaces';
import { getDataAllRoundsOfGame } from '../thunks';

interface IGameStatistics {
  gameStatistics: IGameRoundData[];
}

const initialGameStatistics: IGameStatistics = {
  gameStatistics: [] as IGameRoundData[],
};

export const gameStatisticsSlice = createSlice({
  name: 'gameStatistics',
  initialState: initialGameStatistics,
  reducers: {
    deleteStatistics(state) {
      const newState = { ...initialGameStatistics };
      return newState;
    },
  },
  extraReducers: builder => {
    builder.addCase(getDataAllRoundsOfGame.fulfilled, (state, action) => {
      state.gameStatistics = action.payload;
    });
  },
});

export const gameStatisticsReducer = gameStatisticsSlice.reducer;
export const { deleteStatistics } = gameStatisticsSlice.actions;

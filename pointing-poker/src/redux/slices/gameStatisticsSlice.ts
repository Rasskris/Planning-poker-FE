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
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getDataAllRoundsOfGame.fulfilled, (state, action) => {
      state.gameStatistics = action.payload;
    });
  },
});

export const gameStatisticsReducer = gameStatisticsSlice.reducer;

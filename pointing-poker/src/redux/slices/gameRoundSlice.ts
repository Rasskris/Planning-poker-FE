import { createSlice } from '@reduxjs/toolkit';
import { ROUND_STATUS } from '../../constants';
import { IGameRoundData } from '../../interfaces';
import { getRoundStatus, updateRoundStatus } from '../thunks';

const initialState: IGameRoundData = {
  roundStatus: ROUND_STATUS.NOT_STARTED,
};

export const gameRoundSlice = createSlice({
  name: 'gameRound',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateRoundStatus.fulfilled, (state, { payload }) => {
        state.roundStatus = payload;
      })
      .addCase(getRoundStatus.fulfilled, (state, { payload }) => {
        state.roundStatus = payload;
      });
  },
});

export const gameRoundReducer = gameRoundSlice.reducer;

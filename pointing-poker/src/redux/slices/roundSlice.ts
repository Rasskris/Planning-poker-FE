import { createSlice } from '@reduxjs/toolkit';
import { ROUND_STATUS } from '../../enums';
import { RoundData } from '../../interfaces';
import { getRoundStatus, startRound, finishRound } from '../thunks';

const initialState: RoundData = {
  roundStatus: ROUND_STATUS.NOT_STARTED,
};

export const roundSlice = createSlice({
  name: 'round',
  initialState,
  reducers: {
    resetRoundStatus: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(startRound.fulfilled, state => {
        state.roundStatus = ROUND_STATUS.STARTED;
      })
      .addCase(finishRound.fulfilled, state => {
        state.roundStatus = ROUND_STATUS.FINISHED;
      })
      .addCase(getRoundStatus.fulfilled, (state, { payload }) => {
        state.roundStatus = payload;
      });
  },
});

export const { resetRoundStatus } = roundSlice.actions;
export const roundReducer = roundSlice.reducer;

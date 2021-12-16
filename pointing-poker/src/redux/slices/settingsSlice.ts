import { createSlice } from '@reduxjs/toolkit';
import { Settings } from '../../interfaces';
import { SCORE_TYPE } from '../../enums';
import { updateSettings, getSettings } from '../thunks';
import { SCORE_VALUES_FN, SCORE_TYPE_SHORT_FN } from '../../constants';

const initialState: Settings = {
  scramMasterAsPlayer: false,
  scoreType: SCORE_TYPE.fibonacciNumbers,
  scoreTypeShort: SCORE_TYPE_SHORT_FN,
  timerValues: {
    minutes: 0,
    seconds: 0,
  },
  scoreValues: SCORE_VALUES_FN,
  automaticAdmitAfterStartGame: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateSettings.fulfilled, (state, { payload }) => {
        const newState = { ...state, ...payload };

        return newState;
      })
      .addCase(getSettings.fulfilled, (state, { payload }) => {
        const newState = { ...state, ...payload };

        return newState;
      });
  },
});

export const settingsReducer = settingsSlice.reducer;

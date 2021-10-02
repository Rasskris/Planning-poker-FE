import { createSlice } from '@reduxjs/toolkit';
import { IGameSettings } from '../../interfaces/IGameSettings';
import { ITypesScoreCards } from '../../interfaces/ITypesScoreCards';
import { updateGameSettings, getGameSettings } from '../thunks';
import { SCORE_VALUES_FN, SCORE_TYPE_SHORT_FN } from '../../constants';

const initialState: IGameSettings = {
  scramMasterAsPlayerSetting: false,
  scoreTypeSetting: ITypesScoreCards.fibonacciNumbers,
  scoreTypeShortSetting: SCORE_TYPE_SHORT_FN,
  timerValuesSetting: {
    minutes: 0,
    seconds: 0,
  },
  scoreValues: SCORE_VALUES_FN,
  automaticAdmitAfterStartGame: false,
};

export const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateGameSettings.fulfilled, (state, { payload }) => {
        const newState = { ...state, ...payload };

        return newState;
      })
      .addCase(getGameSettings.fulfilled, (state, { payload }) => {
        const newState = { ...state, ...payload };

        return newState;
      });
  },
});

export const gameSettingsReducer = gameSettingsSlice.reducer;

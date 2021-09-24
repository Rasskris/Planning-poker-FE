import { createSlice } from '@reduxjs/toolkit';
import { IGameSettings } from '../../interfaces/IGameSettings';
import { ITypesScoreCards } from '../../interfaces/ITypesScoreCards';
import { addGameSettings, getGameSettings } from '../thunks';

const initialGameSettingsState: IGameSettings = {
  scramMasterAsPlayerSetting: false,
  changingCardInRoundEndSetting: false,
  isTimerNeededSetting: false,
  changeSelectionAfterFlippingCardsSetting: false,
  automaticFlipCardsSetting: false,
  scoreTypeSetting: ITypesScoreCards.fibonacciNumbers,
  scoreTypeShortSetting: '',
  timerValuesSetting: {
    minutes: 0,
    seconds: 0,
  },
};

export const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState: initialGameSettingsState,
  reducers: {
    updateSettings(state, action) {
      const newState = { ...state, ...action.payload };
      return newState;
    },
  },
  extraReducers: builder => {
    builder.addCase(addGameSettings.fulfilled, (state, action) => {
      const newState = { ...state, ...action.payload };
      return newState;
    });
    builder.addCase(getGameSettings.fulfilled, (state, action) => {
      const newState = { ...state, ...action.payload };
      return newState;
    });
  },
});

export const { updateSettings } = gameSettingsSlice.actions;
export const gameSettingsReducer = gameSettingsSlice.reducer;

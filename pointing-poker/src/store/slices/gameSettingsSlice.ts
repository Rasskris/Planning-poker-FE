import { createSlice } from '@reduxjs/toolkit';
import { ITypesScoreCards } from '../../interfaces/ITypesScoreCards';

interface GameSettingsState {
  scramMasterAsPlayerSetting: boolean;
  changingCardInRoundEndSetting: boolean;
  isTimerNeededSetting: boolean;
  changeSelectionAfterFlippingCardsSetting: boolean;
  automaticFlipCardsSetting: boolean;
  scoreTypeSetting: ITypesScoreCards;
  scoreTypeShortSetting: string;
  timerValuesSetting: {
    minutes: number;
    seconds: number;
  };
}

const initialGameSettingsState: { gameSettings: GameSettingsState } = {
  gameSettings: {
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
  },
};

export const GameSettingsSlice = createSlice({
  name: 'game-settings',
  initialState: initialGameSettingsState,
  reducers: {
    updateSettings(state, action) {
      const newState = Object.assign(state.gameSettings, action.payload);
      state.gameSettings = newState;
    },
  },
});

export const { updateSettings } = GameSettingsSlice.actions;
export default GameSettingsSlice.reducer;

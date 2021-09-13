import { createSlice } from '@reduxjs/toolkit';
import { ITypesScoreCards } from '../../interfaces/ITypesScoreCards';

interface GameSettingsState {
  scramMasterAsPlayer: boolean;
  changingCardInRoundEnd: boolean;
  isTimerNeeded: boolean;
  changeSelectionAfterFlippingCards: boolean;
  automaticFlipCards: boolean;
  scoreType: ITypesScoreCards;
  scoreTypeShort: string;
  timerValues: {
    minutes: number;
    seconds: number;
  };
}

const initialGameSettingsState: { gameSettings: GameSettingsState } = {
  gameSettings: {
    scramMasterAsPlayer: false,
    changingCardInRoundEnd: false,
    isTimerNeeded: false,
    changeSelectionAfterFlippingCards: false,
    automaticFlipCards: false,
    scoreType: ITypesScoreCards.fibonacciNumbers,
    scoreTypeShort: '',
    timerValues: {
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

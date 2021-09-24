import { ITypesScoreCards } from './ITypesScoreCards';

export interface IGameSettings {
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

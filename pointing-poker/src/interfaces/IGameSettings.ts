import { ITypesScoreCards } from './ITypesScoreCards';

export interface IGameSettings {
  scramMasterAsPlayerSetting: boolean;
  scoreTypeSetting: ITypesScoreCards;
  scoreTypeShortSetting: string;
  timerValuesSetting: {
    minutes: number;
    seconds: number;
  };
  scoreValues: Array<string>;
  automaticAdmitAfterStartGame: boolean;
}

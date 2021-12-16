import { SCORE_TYPE } from '../enums';

export interface Settings {
  scramMasterAsPlayer: boolean;
  scoreType: SCORE_TYPE;
  scoreTypeShort: string;
  timerValues: {
    minutes: number;
    seconds: number;
  };
  scoreValues: Array<string>;
  automaticAdmitAfterStartGame: boolean;
}

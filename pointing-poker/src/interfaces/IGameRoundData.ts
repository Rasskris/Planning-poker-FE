export interface IGameRoundData {
  roundIsStarted: boolean;
  currentIssue: string;
  playerCards: {};
  roundStatistics: {};
  isActive: boolean;
  scoreTypeValue: string;
  timeLeft: {
    minutes: number;
    seconds: number;
  };
}

export interface IssueStatistics {
  scoreType: string;
  scoreValue: string;
  percent: number;
}

export interface Issue {
  id: string;
  creatorId: string;
  gameId: string;
  title: string;
  priority: string;
  isCurrent: boolean;
  isDone: boolean;
  statistics?: Array<IssueStatistics>;
}

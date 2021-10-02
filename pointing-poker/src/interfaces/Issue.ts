export interface IssueStatistics {
  scoreType: string;
  scoreValue: string;
  percent: number;
}

export interface Issue {
  id: string;
  isCurrent: boolean;
  title: string;
  priority: string;
  creatorId: string;
  gameId: string;
  isDone: boolean;
  statistics?: Array<IssueStatistics>;
}

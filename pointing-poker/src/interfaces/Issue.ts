export interface Issue {
  id: string;
  isCurrent: boolean;
  title: string;
  priority: string;
  creatorId: string;
  gameId: string;
  done?: boolean;
}

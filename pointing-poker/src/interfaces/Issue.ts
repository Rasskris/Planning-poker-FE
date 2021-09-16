export interface Issue {
  id?: string;
  title: string;
  priority: string;
  creatorId: string;
  gameId: string;
  done?: boolean;
}

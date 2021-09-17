interface IGameCard {
  id: number;
  scoreValue: number | 'unknown' | 'coffe';
  scoreTypeShort: string;
}

interface ICollectionGameCards {
  scoreType: string;
  cards: IGameCard[];
}

export type { IGameCard, ICollectionGameCards };

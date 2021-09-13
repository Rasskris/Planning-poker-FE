interface IGameCard {
  id: number;
  scoreValue: number | string;
  scoreTypeShort: string;
}

interface ICollectionGameCards {
  scoreType: string;
  cards: IGameCard[];
}

export type { IGameCard, ICollectionGameCards };

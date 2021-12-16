interface GameCard {
  id: number;
  scoreValue: number | 'unknown' | 'coffe';
  scoreTypeShort: string;
}

interface CollectionGameCards {
  scoreType: string;
  cards: GameCard[];
}

export type { GameCard, CollectionGameCards };

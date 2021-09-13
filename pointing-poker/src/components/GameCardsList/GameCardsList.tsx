import React from 'react';
import { GameCard } from '..';
import { ITypesScoreCards } from '../../interfaces/ITypesScoreCards';
import { ICollectionGameCards } from '../../interfaces/ICollectionGameCards';
import styles from './GameCardList.module.scss';

interface GameCardsListProps {
  scoreType: ITypesScoreCards;
  collectionGameCards: ICollectionGameCards[];
}

const GameCardsList = ({ scoreType, collectionGameCards }: GameCardsListProps) => {
  const getGameCards = () => {
    return collectionGameCards.map(collection => {
      if (collection.scoreType === scoreType) {
        return collection.cards.map(card => {
          return <GameCard scoreType={card.scoreTypeShort} scoreValue={card.scoreValue} />;
        });
      }
      return null;
    });
  };

  return <div className={styles.game_cards_list}>{getGameCards()}</div>;
};

export { GameCardsList };

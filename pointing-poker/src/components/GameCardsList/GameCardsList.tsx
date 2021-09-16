import React, { FC } from 'react';
import { GameCard } from '..';
import { ITypesScoreCards } from '../../interfaces/ITypesScoreCards';
import { ICollectionGameCards } from '../../interfaces/ICollectionGameCards';
import styles from './GameCardList.module.scss';

interface GameCardsListProps {
  scoreType: ITypesScoreCards;
  collectionGameCards: ICollectionGameCards[];
}

const GameCardsList: FC<GameCardsListProps> = ({ scoreType, collectionGameCards }) => {
  const selectedCardsCollection = collectionGameCards.find(collection => collection.scoreType === scoreType);
  if (!selectedCardsCollection) return null;

  return (
    <div className={styles.game_cards_list}>
      {selectedCardsCollection.cards.map(card => {
        return <GameCard scoreType={card.scoreTypeShort} scoreValue={card.scoreValue} key={card.id} />;
      })}
    </div>
  );
};

export { GameCardsList };

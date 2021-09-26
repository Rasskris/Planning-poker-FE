import React, { FC } from 'react';
import { GameCard } from '..';
import { useAppSelector } from '../../hooks';
import classes from './RoundStatistics.module.scss';

const RoundStatistics: FC = () => {
  const { roundStatistics } = useAppSelector(state => state.gameRound);
  const precent: string[] = Object.values(roundStatistics);
  const cardScoreValue = Object.keys(roundStatistics);
  return (
    <div>
      {cardScoreValue.map((scoreValue, index) => {
        return (
          <div>
            <GameCard
              key={scoreValue}
              isCurrent={false}
              scoreType={'FN'} //TO DO: GET VALUE FROM state.gameRound.typeCardValue
              scoreValue={scoreValue}
              handleSelectCurrentCard={() => {}}
            />
            <div>{precent[index]}</div>
          </div>
        );
      })}
    </div>
  );
};

export { RoundStatistics };

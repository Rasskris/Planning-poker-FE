import React, { FC } from 'react';
import { GameCard } from '..';
import { useAppSelector } from '../../hooks';
import classes from './RoundStatistics.module.scss';

const RoundStatistics: FC = () => {
  const { roundStatistics, scoreTypeValue } = useAppSelector(state => state.gameRound);
  const precent: string[] = Object.values(roundStatistics);
  const cardScoreValue = Object.keys(roundStatistics);
  return (
    <div className={classes.game_statistics}>
      <p>Statistics</p>
      <div className={classes.wrapper}>
        {cardScoreValue.map((scoreValue, index) => {
          return (
            <div key={scoreValue}>
              <GameCard isCurrent={false} scoreType={scoreTypeValue} scoreValue={scoreValue} />
              <div>{precent[index]}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { RoundStatistics };

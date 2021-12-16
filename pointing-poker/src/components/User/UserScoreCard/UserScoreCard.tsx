import { FC } from 'react';
import { PlayingCard } from '../../Game/PlayingCard';
import classes from './UserScoreCard.module.scss';

interface ScoreCardProps {
  scoreType?: string;
  scoreValue?: string;
  isScoreVisible: boolean;
}

export const UserScoreCard: FC<ScoreCardProps> = ({ scoreType, scoreValue, isScoreVisible }) => {
  return (
    <div className={classes.scoreCard}>
      {isScoreVisible ? (
        <PlayingCard scoreType={scoreType} scoreValue={scoreValue} />
      ) : (
        <div className={classes.cardCover}></div>
      )}
    </div>
  );
};

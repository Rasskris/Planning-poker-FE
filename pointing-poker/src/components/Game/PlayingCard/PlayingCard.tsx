import { FC } from 'react';
import { VALUE_COFFE } from '../../../constants';
import classes from './PlayingCard.module.scss';

interface PlayingCardProps {
  scoreValue?: string;
  scoreType?: string;
}

export const PlayingCard: FC<PlayingCardProps> = ({ scoreType, scoreValue }) => {
  const centerCard = scoreValue === VALUE_COFFE ? <div className={classes.cardImg} /> : scoreType;

  return (
    <>
      <div className={classes.top}>
        <span data-testid="topCard">{scoreValue}</span>
      </div>
      <div className={classes.center} data-testid="centerCard">
        {centerCard}
      </div>
      <div className={classes.bottom}>
        <span data-testid="bottomCard">{scoreValue}</span>
      </div>
    </>
  );
};

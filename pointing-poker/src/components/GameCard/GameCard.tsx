import { FC } from 'react';
import classes from './GameCard.module.scss';

interface GameCardProps {
  scoreType: string;
  scoreValue: number | string; //| 'unknown' | 'coffe';
  handleEditScoreValue?: VoidFunction;
}

const GameCard: FC<GameCardProps> = ({ scoreType, scoreValue, handleEditScoreValue }) => {
  const centerCard = scoreValue === 'coffe' ? <div className={classes.cardImg} /> : scoreType;

  return (
    <div className={classes.gameCard}>
      <div className={classes.top}>
        <span data-testid="topCard">{scoreValue}</span>
        {handleEditScoreValue && <button className={classes.btnEdit} onClick={handleEditScoreValue}></button>}
      </div>
      <div className={classes.center} data-testid="centerCard">
        {centerCard}
      </div>
      <div className={classes.bottom}>
        <span data-testid="bottomCard">{scoreValue}</span>
      </div>
    </div>
  );
};

export { GameCard };

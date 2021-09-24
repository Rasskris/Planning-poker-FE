import { FC } from 'react';
import { useAppSelector } from '../../hooks';
import { selectStatusGame } from '../../redux/selectors';
import classes from './GameCard.module.scss';

interface IProps {
  scoreType: string;
  scoreValue: number | 'unknown' | 'coffe';
  handleEditScoreValue?: VoidFunction;
}

const GameCard: FC<IProps> = ({ scoreType, scoreValue, handleEditScoreValue }) => {
  const isStartedGame = useAppSelector(selectStatusGame);
  const centerCard = scoreValue === 'coffe' ? <div className={classes.cardImg} /> : scoreType;

  const handleClick = () => {

  };

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
      {isStartedGame && <div onClick={handleClick}></div>}
    </div>
  );
};

export { GameCard };

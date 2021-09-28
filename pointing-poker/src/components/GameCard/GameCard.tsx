import { FC } from 'react';
import { useAppSelector } from '../../hooks';
import { selectGameStatus } from '../../redux/selectors';
import { VALUE_COFFE } from '../../constants';
import classes from './GameCard.module.scss';

interface IGameProps {
  isCurrent: boolean;
  scoreType: string;
  scoreValue: string;
  handleSelectCurrentCard?: (scoreValue: string, scoreType: string) => void;
}

const GameCard: FC<IGameProps> = ({ isCurrent, scoreType, scoreValue, handleSelectCurrentCard }) => {
  const gameCardClasses = isCurrent ? [classes.gameCard, classes.active].join(' ') : classes.gameCard;
  const centerCard = scoreValue === VALUE_COFFE ? <div className={classes.cardImg} /> : scoreType;
  const isGameStarted = useAppSelector(selectGameStatus);

  const handleClick = () => {
    if (!handleSelectCurrentCard) return;
    handleSelectCurrentCard(scoreValue, scoreType);
  };

  return (
    <div className={gameCardClasses}>
      <div className={classes.top}>
        <span data-testid="topCard">{scoreValue}</span>
      </div>
      <div className={classes.center} data-testid="centerCard">
        {centerCard}
      </div>
      <div className={classes.bottom}>
        <span data-testid="bottomCard">{scoreValue}</span>
      </div>
      {isGameStarted && (
        <div className={classes.cover} onClick={handleClick}>
          <span className={classes.selectedCard} />
        </div>
      )}
    </div>
  );
};

export { GameCard };

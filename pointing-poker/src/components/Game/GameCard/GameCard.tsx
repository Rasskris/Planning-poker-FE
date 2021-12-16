import { FC, memo } from 'react';
import classnames from 'classnames';
import { useAppSelector } from '../../../hooks';
import { selectRoundStatus } from '../../../redux/selectors';
import { ROUND_STATUS } from '../../../enums';
import { PlayingCard } from '../PlayingCard';
import classes from './GameCard.module.scss';

interface GameProps {
  isCurrent?: boolean;
  scoreType: string;
  scoreValue: string;
  onSelectCurrentCard?: (scoreValue: string, scoreType: string) => void;
}

export const GameCard: FC<GameProps> = memo(({ isCurrent, scoreType, scoreValue, onSelectCurrentCard }) => {
  const roundStatus = useAppSelector(selectRoundStatus);
  const isRoundStarted = roundStatus === ROUND_STATUS.STARTED;
  const gameCardClasses = classnames(classes.gameCard, {
    [classes.active]: isCurrent,
  });

  const handleClick = () => {
    if (!onSelectCurrentCard) return;
    onSelectCurrentCard(scoreValue, scoreType);
  };

  return (
    <div className={gameCardClasses}>
      <PlayingCard scoreType={scoreType} scoreValue={scoreValue} />
      {isRoundStarted && (
        <div className={classes.cover} onClick={handleClick}>
          <span className={classes.selectedCard} />
        </div>
      )}
    </div>
  );
});

GameCard.displayName = 'GameCard';

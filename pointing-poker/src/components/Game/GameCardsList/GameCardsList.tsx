import { FC, useCallback } from 'react';
import { GameCard } from '../..';
import { useAppDispatch, useAppSelector, useCurrentGameCard } from '../../../hooks';
import { selectCurrentUser, selectScoreTypeShort, selectScoreValues } from '../../../redux/selectors';
import { updateUser } from '../../../redux/thunks';
import classes from './GameCardList.module.scss';

const GameCardsList: FC = () => {
  const [currentGameCard, setCurrentGameCard] = useCurrentGameCard();
  const scoreValues = useAppSelector(selectScoreValues);
  const scoreType = useAppSelector(selectScoreTypeShort);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleSelectCurrentCard = useCallback(
    (scoreValue: string, scoreType: string) => {
      const selectedCard = {
        scoreType,
        scoreValue,
      };

      setCurrentGameCard(scoreValue);
      dispatch(updateUser({ ...currentUser, selectedCard }));
    },
    [currentUser, dispatch, setCurrentGameCard],
  );

  return (
    <div className={classes.gameCardList}>
      {scoreValues.map(value => (
        <GameCard
          key={value}
          isCurrent={currentGameCard === value}
          scoreType={scoreType}
          scoreValue={value}
          onSelectCurrentCard={handleSelectCurrentCard}
        />
      ))}
    </div>
  );
};

export { GameCardsList };

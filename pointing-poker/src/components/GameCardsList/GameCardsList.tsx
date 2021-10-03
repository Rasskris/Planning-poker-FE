import { FC, useState } from 'react';
import { GameCard } from '..';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCurrentUser, selectScoreTypeShort, selectScoreValues } from '../../redux/selectors';
import { updateUser, updateUserGameCard } from '../../redux/thunks';
import classes from './GameCardList.module.scss';

const GameCardsList: FC = () => {
  const [currentGameCard, setCurrentGameCard] = useState('');
  const scoreValues = useAppSelector(selectScoreValues);
  const scoreType = useAppSelector(selectScoreTypeShort);
  const currentUser = useAppSelector(selectCurrentUser);
  const { isActive: roundIsActive, currentIssue } = useAppSelector(state => state.gameRound);
  const dispatch = useAppDispatch();

  const handleSelectCurrentCard = (scoreValue: string, scoreType: string) => {
    const selectedCard = {
      scoreType,
      scoreValue,
    };

    setCurrentGameCard(scoreValue);
    dispatch(updateUser({ ...currentUser, selectedCard }));

    if (!roundIsActive || !currentUser) return; // !gameRoundData.isActive - makes maps non-clickable if the round is not active (ended)
    dispatch(
      updateUserGameCard({
        currentIssue,
        gameId: currentUser.gameId,
        userId: currentUser.id,
        valueSelectedGameCard: scoreValue,
      }),
    );
  };

  return (
    <div className={classes.game_cards_list}>
      {scoreValues.map(value => (
        <GameCard
          key={value}
          isCurrent={currentGameCard === value}
          scoreType={scoreType}
          scoreValue={value}
          handleSelectCurrentCard={handleSelectCurrentCard}
        />
      ))}
    </div>
  );
};

export { GameCardsList };

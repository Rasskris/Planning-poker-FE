import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectCurrentIssue, selectRoundStatus } from '../../../redux/selectors';
import { resetSelectedCards } from '../../../redux/slices';
import { startRound, updateGameStatus } from '../../../redux/thunks';
import { ROUND_STATUS } from '../../../enums';
import { Button, WaitingList } from '../..';
import { TOOLTIP_TEXT } from '../../../constants';
import classes from './GameDealerPanel.module.scss';

interface GameDealerPanelProps {
  gameId: string;
  currentUserId: string;
  scoreTypeShort: string;
}

const GameDealerPanel: FC<GameDealerPanelProps> = ({ gameId, currentUserId, scoreTypeShort }) => {
  const currentIssue = useAppSelector(selectCurrentIssue);
  const roundStatus = useAppSelector(selectRoundStatus);
  const dispatch = useAppDispatch();
  const isRoundStarted = roundStatus === ROUND_STATUS.STARTED;

  const handleStartRound = () => {
    dispatch(
      startRound({
        gameId,
        userId: currentUserId,
      }),
    );
    dispatch(resetSelectedCards(scoreTypeShort));
  };

  const handleStopGame = () => {
    dispatch(updateGameStatus({ gameId, currentUserId, isStarted: false }));
  };

  return (
    <section className={classes.panel}>
      <WaitingList />
      <div className={classes.wrapper}>
        <Button text="Stop Game" colorButton="dark" type="button" onClick={handleStopGame} disabled={isRoundStarted} />
        {currentIssue?.isDone ? (
          <Button
            type="button"
            text="RESTART ROUND"
            colorButton="light"
            onClick={handleStartRound}
            disabled={isRoundStarted}
          />
        ) : (
          <Button
            type="button"
            text="RUN ROUND"
            colorButton="dark"
            tooltip={currentIssue ? undefined : TOOLTIP_TEXT}
            onClick={handleStartRound}
            disabled={isRoundStarted || !currentIssue}
          />
        )}
      </div>
    </section>
  );
};

export { GameDealerPanel };

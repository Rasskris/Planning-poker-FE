import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector, useMemberToast, useUsers } from '../../hooks';
import { selectAutoAdmitedStatus, selectPendingDealerAnswer, selectRejectedToGameStatus } from '../../redux/selectors';
import { updateGameStatus } from '../../redux/thunks';
import { User } from '../../interfaces';
import { resetAdmitedToGameStatus } from '../../redux/slices';
import { USER_ROLES } from '../../enums';
import { PENDING_MESSAGE } from '../../constants';
import {
  IssueList,
  GameSettings,
  VoteNotification,
  RejectedToGameNotification,
  TimerNotification,
  LobbyDealerPanel,
  MembersContainer,
  Spinner,
} from '../../components';
import classes from './Lobby.module.scss';

interface LobbyProps {
  currentUser: User;
}

const Lobby: FC<LobbyProps> = ({ currentUser }) => {
  const [isTimerNotificationVisible, setIsTimerNotificationVisible] = useState(false);
  const { id: currentUserId, role: currentUserRole, gameId } = currentUser;
  const { dealer, players, observers } = useUsers(gameId);
  const isPendingDealerAnswer = useAppSelector(selectPendingDealerAnswer);
  const isAccessToGameRejected = useAppSelector(selectRejectedToGameStatus);
  const isAutoAdmitedToGame = useAppSelector(selectAutoAdmitedStatus);
  const isDealer = currentUserRole === USER_ROLES.DEALER;
  const dispatch = useAppDispatch();
  useMemberToast();

  useEffect(() => {
    if (isAutoAdmitedToGame) {
      dispatch({ type: updateGameStatus.fulfilled.type, payload: true });
      dispatch(resetAdmitedToGameStatus());
    }
  }, [currentUserId, dispatch, isAutoAdmitedToGame]);

  const handleCloseTimerNotification = () => () => {
    setIsTimerNotificationVisible(false);
  };

  if (isAccessToGameRejected) {
    return <RejectedToGameNotification isVisible={isAccessToGameRejected} currentUserId={currentUserId} />;
  }

  return isPendingDealerAnswer ? (
    <Spinner text={PENDING_MESSAGE} />
  ) : (
    <section className={classes.lobby}>
      <div className={classes.content}>
        {isDealer && (
          <LobbyDealerPanel
            gameId={gameId}
            currentUserId={currentUserId}
            setVisibleTimerNotification={setIsTimerNotificationVisible}
          />
        )}
        <MembersContainer
          gameId={gameId}
          isScoreVisible={false}
          currentUser={currentUser}
          dealer={dealer}
          players={players}
          observers={observers}
        />
        <div className={classes.wrapper}>
          <IssueList currentUser={currentUser} />
        </div>
        {isDealer && (
          <div className={classes.wrapper}>
            <GameSettings />
          </div>
        )}
      </div>
      <VoteNotification />
      {isTimerNotificationVisible && (
        <TimerNotification isVisible={isTimerNotificationVisible} onCloseModal={handleCloseTimerNotification} />
      )}
    </section>
  );
};

export { Lobby };

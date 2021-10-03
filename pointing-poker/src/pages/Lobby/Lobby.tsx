import { FC, useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectAutoAdmitedStatus,
  selectChatStatus,
  selectDealer,
  selectObservers,
  selectPendingDealerAnswer,
  selectPlayers,
  selectRejectedToGameStatus,
  selectSettings,
  selectUserById,
  selectUserOpenedVote,
  selectVoteStatus,
  selectVoteVictim,
} from '../../redux/selectors';
import {
  IssueList,
  Chat,
  UserList,
  Button,
  GameSettings,
  MemberNotification,
  DealerNotification,
  VoteNotification,
  Loader,
  RejectedToGameNotification,
  TimerNotification,
  UserCard,
} from '../../components';
import { logout } from '../../redux/actions';
import { getUsers, addVote, updateGameStatus, updateGameSettings, deleteGame, deleteUser } from '../../redux/thunks';
import { IUser } from '../../interfaces';
import { resetAdmitedToGameStatus } from '../../redux/slices';
import { USER_ROLES } from '../../constants';
import { checkIsTimerValuesNotSetted } from '../../utils';
import classes from './Lobby.module.scss';

interface ILobbyProps {
  currentUser: IUser;
}

const Lobby: FC<ILobbyProps> = ({ currentUser }) => {
  const [victimData, setVictimData] = useState({ id: '', name: '' });
  const [isTimerNotificationVisible, setIsTimerNotificationVisible] = useState(false);

  const settings = useAppSelector(selectSettings);
  const victim = useAppSelector(selectVoteVictim);
  const userIdOpenedVote = useAppSelector(selectUserOpenedVote);
  const userOpenedVote = useAppSelector(state => selectUserById(state, userIdOpenedVote));
  const isVoteActive = useAppSelector(selectVoteStatus);
  const isChatOpen = useAppSelector(selectChatStatus);
  const observers = useAppSelector(selectObservers);
  const dealer = useAppSelector(selectDealer);
  const players = useAppSelector(selectPlayers);
  const isPendingDealerAnswer = useAppSelector(selectPendingDealerAnswer);
  const isAccessToGameRejected = useAppSelector(selectRejectedToGameStatus);
  const isAutoAdmitedToGame = useAppSelector(selectAutoAdmitedStatus);

  const { minutes, seconds } = settings.timerValuesSetting;
  const { id: currentUserId, role: currentUserRole, gameId } = currentUser;
  const isDealer = currentUserRole === USER_ROLES.DEALER;
  const [isCopied, setIsCopied] = useState({ value: gameId, copied: false });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers(gameId));
  }, [dispatch, gameId, observers, players, dealer]);

  useEffect(() => {
    if (isAutoAdmitedToGame) {
      dispatch({ type: updateGameStatus.fulfilled.type, payload: true });
      dispatch(resetAdmitedToGameStatus());
    }
  }, [currentUserId, dispatch, isAutoAdmitedToGame]);

  const handleKickUser = (id: string, name: string) => {
    if (isDealer) {
      setVictimData({ id, name });
    } else {
      dispatch(addVote({ gameId, victimId: id, currentUserId }));
    }
  };

  const handleStartGame = () => {
    const isTimerValuesNotSetted = checkIsTimerValuesNotSetted(minutes, seconds);

    if (isTimerValuesNotSetted) {
      setIsTimerNotificationVisible(true);
    } else {
      dispatch(updateGameStatus({ gameId, currentUserId, isStarted: true }));
      dispatch(updateGameSettings({ userId: currentUserId, settings, gameId }));
    }
  };

  const handleCancelGame = () => {
    dispatch(deleteGame(gameId));
    dispatch(logout());
  };

  const handleExitGame = () => {
    dispatch(deleteUser({ currentUserId }));
    dispatch(logout());
  };

  const handleCloseTimerNotification = () => () => {
    setIsTimerNotificationVisible(false);
  };

  const handleCopy = () => {
    setIsCopied({
      value: gameId,
      copied: true,
    });
  };

  return (
    <section className={classes.lobby}>
      {isPendingDealerAnswer && <Loader isVisible={isPendingDealerAnswer} />}
      {isAccessToGameRejected && (
        <RejectedToGameNotification isVisible={isAccessToGameRejected} currentUserId={currentUserId} />
      )}
      <div className={classes.content}>
        {isDealer && (
          <div className={classes.wrapper}>
            <h3 className={classes.title}>Game ID:</h3>
            <div className={classes.tooltipContainer}>
              <p className={classes.gameId}>{gameId}</p>
              <CopyToClipboard text={isCopied.value} onCopy={handleCopy}>
                <Button type="button" text="Copy" colorButton="light" />
              </CopyToClipboard>
              <span className={classes.tooltipText}>Use this id to invite others</span>
            </div>
            <div className={classes.btnWrapper}>
              <Button text="Start Game" colorButton="dark" type="button" onClick={handleStartGame} />
              <Button text="Cancel Game" colorButton="light" type="button" onClick={handleCancelGame} />
            </div>
          </div>
        )}
        {!isDealer && (
          <div className={classes.wrapper}>
            <Button text="Exit" colorButton="dark" type="button" onClick={handleExitGame} />
          </div>
        )}
        <div className={classes.wrapper}>
          <p className={classes.title}>Dealer</p>
          {dealer && (
            <UserCard
              id={dealer.id}
              currentUserId={currentUserId}
              firstName={dealer.firstName}
              lastName={dealer.lastName}
              role={dealer.role}
              jobPosition={dealer.jobPosition}
              handleKickUser={handleKickUser}
            />
          )}
        </div>
        <div className={classes.wrapper}>
          <UserList
            users={players}
            title="Players"
            currentUserId={currentUserId}
            handleKickUser={handleKickUser}
            isScoreVisible={false}
          />
        </div>
        <div className={classes.wrapper}>
          <UserList
            users={observers}
            title="Observers"
            currentUserId={currentUserId}
            handleKickUser={handleKickUser}
            isScoreVisible={false}
          />
        </div>
        <div className={classes.wrapper}>
          <IssueList currentUser={currentUser} />
        </div>
        {isDealer && (
          <div className={classes.wrapper}>
            <GameSettings />
          </div>
        )}
      </div>
      {isChatOpen && (
        <div className={classes.chat}>
          <Chat currentUser={currentUser} />
        </div>
      )}
      <DealerNotification currentUserId={currentUserId} victimData={victimData} />
      {isVoteActive && victim && userOpenedVote && (
        <MemberNotification
          isVoteActive={isVoteActive}
          currentUserId={currentUserId}
          victim={victim}
          userNameOpenedVote={userOpenedVote.firstName}
        />
      )}
      <VoteNotification />
      {isTimerNotificationVisible && (
        <TimerNotification isVisible={isTimerNotificationVisible} handleCloseModal={handleCloseTimerNotification} />
      )}
    </section>
  );
};

export { Lobby };

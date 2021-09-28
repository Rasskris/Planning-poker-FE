import { FC, useEffect, useState } from 'react';
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
} from '../../components';
import { USER_ROLES } from '../../constants';
import { getUsers, addVote, updateGameStatus, addGameSettings } from '../../redux/thunks';
import classes from './Lobby.module.scss';
import { IUser } from '../../interfaces';
import { resetAdmitedToGameStatus } from '../../redux/slices';

interface ILobbyProps {
  currentUser: IUser;
}

const Lobby: FC<ILobbyProps> = ({ currentUser }) => {
  const [victimData, setVictimData] = useState({ id: '', name: '' });

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

  const { id: currentUserId, role: currentUserRole, gameId } = currentUser;
  const isDealer = currentUserRole === USER_ROLES.DEALER;
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
    dispatch(updateGameStatus({ gameId, currentUserId, isStarted: true }));
    dispatch(addGameSettings({ userId: currentUserId, settings, gameId }));
  };

  return (
    <section className={classes.lobby}>
      {isPendingDealerAnswer && <Loader isVisible={isPendingDealerAnswer} />}
      {isAccessToGameRejected && <RejectedToGameNotification isVisible={isAccessToGameRejected} />}
      <div className={classes.content}>
        {isDealer && (
          <div className={classes.wrapper}>
            <h3>Game ID:</h3>
            <p>{gameId}</p>
            <Button text="Start Game" colorButton="dark" type="button" onClick={handleStartGame} />
          </div>
        )}
        <div className={classes.wrapper}>
          <UserList users={dealer} title="Dealer" currentUserId={currentUserId} handleKickUser={handleKickUser} />
        </div>
        <div className={classes.wrapper}>
          <UserList users={players} title="Players" currentUserId={currentUserId} handleKickUser={handleKickUser} />
        </div>
        <div className={classes.wrapper}>
          <UserList users={observers} title="Observers" currentUserId={currentUserId} handleKickUser={handleKickUser} />
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
    </section>
  );
};

export { Lobby };

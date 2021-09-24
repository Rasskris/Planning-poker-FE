import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectChatStatus,
  selectCurrentUser,
  selectDealer,
  selectObservers,
  selectPlayers,
  selectVoteStatus,
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
} from '../../components';
import { USER_ROLES } from '../../constants';
import { IUser } from '../../interfaces';
import { getUsers, addVote, updateGameStatus } from '../../redux/thunks';
import classes from './Lobby.module.scss';

const Lobby: FC = () => {
  const [victimData, setVictimData] = useState({ id: '', name: '' });
  const isActiveVote = useAppSelector(selectVoteStatus);
  const isChatOpen = useAppSelector(selectChatStatus);
  const observers = useAppSelector(selectObservers);
  const dealer = useAppSelector(selectDealer);
  const players = useAppSelector(selectPlayers);
  const { id: currentUserId, role: currentUserRole, gameId } = useAppSelector(selectCurrentUser) as IUser;
  const isDealer = currentUserRole === USER_ROLES.DEALER;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers(gameId));
  }, [dispatch, gameId, observers, players, dealer]);

  const handleKickUser = (id: string, name: string) => {
    if (currentUserRole === USER_ROLES.DEALER) {
      setVictimData({ id, name });
    } else {
      dispatch(addVote({ gameId, victimId: id, currentUserId }));
    }
  };

  const handleStartGame = () => {
    dispatch(updateGameStatus({ gameId, currentUserId, isStarted: true }));
  };

  return (
    <section className={classes.lobby}>
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
          <IssueList />
        </div>
        {isDealer && (
          <div className={classes.wrapper}>
            <GameSettings />
          </div>
        )}
      </div>
      {isChatOpen && (
        <div className={classes.chat}>
          <Chat />
        </div>
      )}
      <DealerNotification currentUserId={currentUserId} victimData={victimData} />
      {isActiveVote && <MemberNotification isActiveVote={isActiveVote} currentUserId={currentUserId} />}
      <VoteNotification />
    </section>
  );
};

export { Lobby };

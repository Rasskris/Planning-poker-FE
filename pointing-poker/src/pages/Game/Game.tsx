import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectChatStatus,
  selectCurrentUser,
  selectDealer,
  selectPlayers,
  selectVoteStatus,
} from '../../redux/selectors';
import { addVote, getUsers } from '../../redux/thunks';
import { USER_ROLES } from '../../constants';
import { IUser } from '../../interfaces';
import {
  Button,
  Chat,
  DealerNotification,
  GameCardsList,
  IssueList,
  MemberNotification,
  UserList,
  VoteNotification,
} from '../../components';
import classes from './Game.module.scss';

const Game: FC = () => {
  const [victimData, setVictimData] = useState({ id: '', name: '' });
  const isActiveVote = useAppSelector(selectVoteStatus);
  const isChatOpen = useAppSelector(selectChatStatus);
  const dealer = useAppSelector(selectDealer);
  const players = useAppSelector(selectPlayers);
  const isVisibleScore = true;
  const { id: currentUserId, role: currentUserRole, gameId } = useAppSelector(selectCurrentUser) as IUser;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers(gameId));
  }, [dispatch, gameId, players, dealer]);

  const handleKickUser = (id: string, name: string) => {
    if (currentUserRole === USER_ROLES.DEALER) {
      setVictimData({ id, name });
    } else {
      dispatch(addVote({ gameId, victimId: id, currentUserId }));
    }
  };

  return (
    <section className={classes.game}>
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <UserList
            isVisibleScore={!isVisibleScore}
            users={dealer}
            title="Dealer"
            currentUserId={currentUserId}
            handleKickUser={handleKickUser}
          />
        </div>
        <div className={classes.wrapper}>
          <UserList
            isVisibleScore={isVisibleScore}
            users={players}
            title="Players"
            currentUserId={currentUserId}
            handleKickUser={handleKickUser}
          />
        </div>
        <div className={classes.wrapper}>
          <Button type="button" text="NEXT ISSUE" colorButton="dark" />
          <IssueList />
        </div>
        <div className={classes.wrapper}>
          <GameCardsList />
        </div>
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

export { Game };

import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectChatStatus,
  selectDealer,
  selectPlayers,
  selectUserById,
  selectUserOpenedVote,
  selectVoteStatus,
  selectVoteVictim,
} from '../../redux/selectors';
import { addVote, getUsers } from '../../redux/thunks';
import { USER_ROLES } from '../../constants';
import { IUser } from '../../interfaces';
import {
  Chat,
  DealerNotification,
  GameCardsList,
  IssueList,
  MemberNotification,
  UserList,
  VoteNotification,
} from '../../components';
import classes from './Game.module.scss';

interface IGameProps {
  currentUser: IUser;
}

const Game: FC<IGameProps> = ({ currentUser }) => {
  const [victimData, setVictimData] = useState({ id: '', name: '' });
  const isVoteActive = useAppSelector(selectVoteStatus);
  const victim = useAppSelector(selectVoteVictim);
  const userIdOpenedVote = useAppSelector(selectUserOpenedVote);
  const userNameOpenedVote = useAppSelector(state => selectUserById(state, userIdOpenedVote));
  const isChatOpen = useAppSelector(selectChatStatus);
  const dealer = useAppSelector(selectDealer);
  const players = useAppSelector(selectPlayers);
  const isScoreVisible = true;
  const { id: currentUserId, role: currentUserRole, gameId } = currentUser;
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
            isScoreVisible={!isScoreVisible}
            users={dealer}
            title="Dealer"
            currentUserId={currentUserId}
            handleKickUser={handleKickUser}
          />
        </div>
        <div className={classes.wrapper}>
          <UserList
            isScoreVisible={isScoreVisible}
            users={players}
            title="Players"
            currentUserId={currentUserId}
            handleKickUser={handleKickUser}
          />
        </div>
        <div className={classes.wrapper}>
          <IssueList currentUser={currentUser} />
        </div>
        <div className={classes.wrapper}>
          <GameCardsList />
        </div>
      </div>
      {isChatOpen && (
        <div className={classes.chat}>
          <Chat currentUser={currentUser} />
        </div>
      )}
      <DealerNotification currentUserId={currentUserId} victimData={victimData} />
      {isVoteActive && victim && userNameOpenedVote && (
        <MemberNotification
          isVoteActive={isVoteActive}
          currentUserId={currentUserId}
          victim={victim}
          userNameOpenedVote={userNameOpenedVote.firstName}
        />
      )}
      <VoteNotification />
    </section>
  );
};

export { Game };

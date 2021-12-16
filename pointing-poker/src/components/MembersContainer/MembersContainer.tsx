import { FC, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { User, VictimData } from '../../interfaces';
import { useDispatchWithReturn } from '../../hooks';
import { addVote, deleteUser } from '../../redux/thunks';
import { logout } from '../../redux/actions';
import { USER_ROLES } from '../../enums';
import { Button, DealerNotification, UserList, MemberNotification } from '..';
import { TOAST_OPTIONS } from '../../constants';
import classes from './Members.module.scss';

interface MembersContainerProps {
  gameId: string;
  currentUser: User;
  isScoreVisible: boolean;
  dealer: User[];
  players: User[];
  observers: User[];
}

const MembersContainer: FC<MembersContainerProps> = ({
  gameId,
  isScoreVisible,
  currentUser,
  dealer,
  players,
  observers,
}) => {
  const { id: currentUserId, role: currentUserRole } = currentUser;
  const isDealer = currentUserRole === USER_ROLES.DEALER;
  const [victimData, setVictimData] = useState<VictimData | null>(null);
  const [dispatch] = useDispatchWithReturn();

  const handleKickUser = useCallback(
    (id: string, name: string) => {
      if (isDealer) {
        setVictimData({ id, name });
      } else {
        dispatch(addVote({ gameId, victimId: id, currentUserId }));
      }
    },
    [currentUserId, dispatch, gameId, isDealer],
  );

  const handleExitGame = async () => {
    try {
      await dispatch(deleteUser(currentUserId));
      dispatch(logout());
    } catch (err: any) {
      toast.error(err.message, TOAST_OPTIONS);
    }
  };

  return (
    <section className={classes.container}>
      <div className={classes.wrapper}>
        <UserList
          users={dealer}
          title="Dealer"
          currentUserId={currentUserId}
          handleKickUser={handleKickUser}
          isScoreVisible={false}
        />
      </div>
      <div className={classes.wrapper}>
        <UserList
          users={players}
          title="Players"
          isPlayer
          currentUserId={currentUserId}
          handleKickUser={handleKickUser}
          isScoreVisible={isScoreVisible}
        />
        <UserList
          users={observers}
          title="Observers"
          currentUserId={currentUserId}
          handleKickUser={handleKickUser}
          isScoreVisible={false}
        />
      </div>
      {!isDealer && (
        <div className={classes.wrapper}>
          <Button text="Exit" colorButton="dark" type="button" onClick={handleExitGame} />
        </div>
      )}
      <DealerNotification setVictimData={setVictimData} victimData={victimData} />
      <MemberNotification gameId={gameId} currentUserId={currentUserId} />
    </section>
  );
};

export { MembersContainer };

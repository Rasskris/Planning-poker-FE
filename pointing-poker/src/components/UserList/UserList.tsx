import { FC } from 'react';
import { UserCard } from '..';
import { useAppSelector } from '../../hooks';
import { IUser } from '../../interfaces';
import { selectGameStatus } from '../../redux/selectors';
import { ScoreCard } from './ScoreCard';
import classes from './UserList.module.scss';

interface IUserListProps {
  title: string;
  users: IUser[];
  isScoreVisible: boolean;
  currentUserId: string;
  isPlayer?: boolean;
  handleKickUser: (id: string, name: string) => void;
}

const UserList: FC<IUserListProps> = ({ isScoreVisible, isPlayer, title, users, currentUserId, handleKickUser }) => {
  const isGameStarted = useAppSelector(selectGameStatus);

  return (
    <div className={classes.userList}>
      <div className={classes.titleWrapper}>
        {isGameStarted && isPlayer && <p className={classes.title}>Score</p>}
        <p className={classes.title}>{title}</p>
      </div>
      {users.map(({ id, firstName, lastName, role, avatar, jobPosition, selectedCard }) => (
        <div className={classes.cardWrapper} key={id}>
          {isGameStarted && isPlayer && (
            <ScoreCard
              scoreType={selectedCard?.scoreType}
              scoreValue={selectedCard?.scoreValue}
              isScoreVisible={isScoreVisible}
            />
          )}
          <UserCard
            id={id}
            currentUserId={currentUserId}
            firstName={firstName}
            lastName={lastName}
            jobPosition={jobPosition}
            handleKickUser={handleKickUser}
            role={role}
          />
        </div>
      ))}
    </div>
  );
};

export { UserList };

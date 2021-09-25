import { FC } from 'react';
import { UserCard } from '..';
import { IUser } from '../../interfaces';
import { ScoreCard } from './ScoreCard';
import classes from './UserList.module.scss';

interface UserListProps {
  title: string;
  users: IUser[];
  isVisibleScore?: boolean;
  currentUserId: string;
  handleKickUser: (id: string, name: string) => void;
}

const UserList: FC<UserListProps> = ({ isVisibleScore, title, users, currentUserId, handleKickUser }) => {
  return (
    <div className={classes.userList}>
      <div className={classes.titleWrapper}>
        {isVisibleScore && <p className={classes.title}>Score</p>}
        <p className={classes.title}>{title}</p>
      </div>
      {users.map(({ id, firstName, lastName, role, avatar, jobPosition, selectedCard }) => (
        <div className={classes.cardWrapper} key={id}>
          {isVisibleScore && <ScoreCard scoreType={selectedCard?.scoreType} scoreValue={selectedCard?.scoreValue} />}
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

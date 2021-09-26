import { FC } from 'react';
import { UserCard } from '..';
import { IUser } from '../../interfaces';
import { ScoreCard } from './ScoreCard';
import classes from './UserList.module.scss';

interface IUserListProps {
  title: string;
  users: IUser[];
  isScoreVisible?: boolean;
  currentUserId: string;
  handleKickUser: (id: string, name: string) => void;
}

const UserList: FC<IUserListProps> = ({ isScoreVisible, title, users, currentUserId, handleKickUser }) => {
  return (
    <div className={classes.userList}>
      <div className={classes.titleWrapper}>
        {isScoreVisible && <p className={classes.title}>Score</p>}
        <p className={classes.title}>{title}</p>
      </div>
      {users.map(({ id, firstName, lastName, role, avatar, jobPosition, selectedCard }) => (
        <div className={classes.cardWrapper} key={id}>
          {isScoreVisible && <ScoreCard scoreType={selectedCard?.scoreType} scoreValue={selectedCard?.scoreValue} />}
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

import { FC } from 'react';
import { UserCard } from '..';
import { User } from '../../interfaces';
import classes from './UserList.module.scss';

interface UserListProps {
  title: string;
  users: User[];
  currentUserId: string;
  handleKickUser: (id: string, name: string) => void;
}

const UserList: FC<UserListProps> = ({ title, users, currentUserId, handleKickUser }) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>{title}</p>
      <div className={classes.userList}>
        {users.map(({ id, firstName, lastName, role, image, jobPosition }) => (
          <UserCard
            key={id}
            id={id}
            currentUserId={currentUserId}
            firstName={firstName}
            lastName={lastName}
            jobPosition={jobPosition}
            handleKickUser={handleKickUser}
            role={role}
          />
        ))}
      </div>
    </div>
  );
};

export { UserList };

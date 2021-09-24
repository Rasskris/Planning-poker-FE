import { FC } from 'react';
import { UserCard } from '..';
import { IUser } from '../../interfaces';
import classes from './UserList.module.scss';

interface UserListProps {
  title: string;
  users: IUser[];
  currentUserId: string;
  handleKickUser: (id: string, name: string) => void;
}

const UserList: FC<UserListProps> = ({ title, users, currentUserId, handleKickUser }) => {
  return (
    <div className={classes.userList}>
      <p className={classes.title}>{title}</p>
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
  );
};

export { UserList };

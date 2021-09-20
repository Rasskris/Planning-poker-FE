import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUsers, deleteUser } from '../../redux/thunks';
import { selectUsers } from '../../redux/selectors';
import { UserCard } from '..';
import { USER_ROLES } from '../../constants';
import { User } from '../../interfaces';
import classes from './UserList.module.scss';

interface UserListProps {
  currentUser: User;
}

const UserList: FC<UserListProps> = ({ currentUser }) => {
  const users = useAppSelector(selectUsers);
  const { id: currentUserId, role, gameId } = currentUser;
  const isObserver = role === USER_ROLES.OBSERVER;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers(gameId));
  }, [dispatch, gameId, users]);

  const handleKickUser = (id: string) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className={classes.userList}>
      <p className={classes.title}>Members:</p>
      {users.map(({ id, firstName, lastName, image, jobPosition }) => (
        <UserCard
          key={id}
          id={id}
          currentUserId={currentUserId}
          firstName={firstName}
          lastName={lastName}
          jobPosition={jobPosition}
          isObserver={isObserver}
          handleKickUser={handleKickUser}
        />
      ))}
    </div>
  );
};

export { UserList };

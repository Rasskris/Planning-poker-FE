import { FC, memo } from 'react';
import { UserCard } from '../..';
import { useAppSelector } from '../../../hooks';
import { User } from '../../../interfaces';
import { selectGameStatus } from '../../../redux/selectors';
import { DefaultContent } from '../../DefaultContent';
import { UserScoreCard } from '../UserScoreCard';
import classes from './UserList.module.scss';

interface UserListProps {
  title: string;
  users: User[];
  isScoreVisible: boolean;
  isPlayer?: boolean;
  currentUserId: string;
  handleKickUser: (id: string, name: string) => void;
}

export const UserList: FC<UserListProps> = memo(
  ({ isScoreVisible, isPlayer, title, users, currentUserId, handleKickUser }) => {
    const isGameStarted = useAppSelector(selectGameStatus);
    const isUserListEmpty = users.length === 0;

    return (
      <div className={classes.userList}>
        <div className={classes.titleWrapper}>
          <p className={classes.title}>{title}</p>
        </div>
        {isUserListEmpty ? (
          <DefaultContent text={`${title} coming soon...`} />
        ) : (
          users.map(({ id, firstName, lastName, role, jobPosition, selectedCard }) => (
            <div className={classes.cardWrapper} key={id}>
              {isGameStarted && isPlayer && (
                <UserScoreCard
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
          ))
        )}
      </div>
    );
  },
);

UserList.displayName = 'UserList';

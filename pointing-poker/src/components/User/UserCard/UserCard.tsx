import { FC, memo } from 'react';
import { getNameInitials } from '../../../utils';
import { USER_ROLES } from '../../../enums';
import classes from './UserCard.module.scss';

interface UserCardProps {
  id: string;
  currentUserId: string;
  firstName: string;
  lastName: string;
  jobPosition: string;
  role: string;
  handleKickUser: (id: string, name: string) => void;
}

export const UserCard: FC<UserCardProps> = memo(
  ({ id, currentUserId, firstName, lastName, jobPosition, role, handleKickUser }) => {
    const nameInitials = getNameInitials(firstName, lastName);
    const isCurrentUser = currentUserId === id;
    const isDealer = role === USER_ROLES.DEALER;

    const handleClick = () => {
      handleKickUser(id, firstName);
    };

    return (
      <div className={classes.userCard}>
        <div className={classes.userAvatar} data-testid="initialsName">
          {nameInitials}
        </div>
        <div className={classes.userInfo}>
          {isCurrentUser && <p className={classes.userCurrent}>it's you</p>}
          <p className={classes.userName}>
            {firstName} {lastName}
          </p>
          <p className={classes.jobPosition}>{jobPosition}</p>
        </div>
        {!isDealer && !isCurrentUser ? <button className={classes.btnKick} onClick={handleClick}></button> : null}
      </div>
    );
  },
);

UserCard.displayName = 'UserCard';

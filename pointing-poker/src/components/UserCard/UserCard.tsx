import { FC } from 'react';
import classes from './UserCard.module.scss';
import { getNameInitials } from '../../utils';

interface UserCardProps {
  id: string;
  currentUserId: string;
  firstName: string;
  lastName?: string;
  jobPosition?: string;
  imgURL?: string;
  isObserver: boolean;
  handleKickUser: (id: string) => void;
}

const UserCard: FC<UserCardProps> = ({
  id,
  currentUserId,
  firstName,
  lastName,
  imgURL,
  jobPosition,
  isObserver,
  handleKickUser,
}) => {
  const nameInitials = getNameInitials(firstName, lastName);
  const isCurrentUser = currentUserId === id;
  const avatarStyle = {
    backgroundImage: `url(${imgURL})`,
  };

  const handleClick = () => {
    handleKickUser(id);
  };

  return (
    <div className={classes.userCard}>
      <div className={classes.userAvatar} style={avatarStyle} data-testid="initialsName">
        {nameInitials}
      </div>
      <div className={classes.userInfo}>
        {isCurrentUser && <p className={classes.userCurrent}>it's you</p>}
        <p className={classes.userName}>
          {firstName} {lastName && lastName}
        </p>
        {jobPosition && <p className={classes.jobPosition}>{jobPosition}</p>}
      </div>
      {isObserver && <button className={classes.btnKick} onClick={handleClick}></button>}
    </div>
  );
};

export { UserCard };

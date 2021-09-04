import { FC } from 'react';
import classes from './UserCard.module.scss';
import { getNameInitials } from '../../utils';

interface UserCardProps {
  isCurrentUser?: boolean;
  firstName: string;
  lastName?: string;
  jobPosition?: string;
  imgURL?: string;
  handleKickUser?: () => void;
}

const UserCard: FC<UserCardProps> = ({ isCurrentUser, firstName, lastName, imgURL, jobPosition, handleKickUser }) => {
  const nameInitials = getNameInitials(firstName, lastName);

  const avatarStyle = {
    backgroundImage: 'url(' + imgURL + ')',
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
      {handleKickUser && <button className={classes.btnKick} onClick={handleKickUser}></button>}
    </div>
  );
};

export default UserCard;

import { FC } from 'react';
import classes from './UserCard.module.scss';
import { getNameInitials } from '../../utils';
import { URL, USER_ROLES } from '../../constants';

interface UserCardProps {
  id: string;
  currentUserId: string;
  firstName: string;
  lastName?: string;
  jobPosition?: string;
  avatar?: string;
  role: string;
  handleKickUser: (id: string, name: string) => void;
}

const UserCard: FC<UserCardProps> = ({
  id,
  currentUserId,
  firstName,
  lastName,
  avatar,
  jobPosition,
  role,
  handleKickUser,
}) => {
  const nameInitials = getNameInitials(firstName, lastName);
  const isCurrentUser = currentUserId === id;
  const isDealer = role === USER_ROLES.DEALER;

  const avatarStyle = avatar
    ? {
        backgroundImage: `url(${URL}/images/${avatar})`,
      }
    : undefined;

  const handleClick = () => {
    handleKickUser(id, firstName);
  };
  console.log(avatarStyle);
  return (
    <div className={classes.userCard}>
      <div className={classes.userAvatar} style={avatarStyle} data-testid="initialsName">
        {!avatar && nameInitials}
      </div>
      <div className={classes.userInfo}>
        {isCurrentUser && <p className={classes.userCurrent}>it's you</p>}
        <p className={classes.userName}>
          {firstName} {lastName && lastName}
        </p>
        {jobPosition && <p className={classes.jobPosition}>{jobPosition}</p>}
      </div>
      {!isDealer && !isCurrentUser ? <button className={classes.btnKick} onClick={handleClick}></button> : null}
    </div>
  );
};

export { UserCard };

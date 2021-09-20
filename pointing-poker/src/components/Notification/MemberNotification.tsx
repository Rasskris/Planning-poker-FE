import { FC } from 'react';
import { useAppDispatch } from '../../hooks';
import { deleteUser } from '../../redux/thunks';
import { Button } from '..';
import { User } from '../../interfaces';
import classes from './Notification.module.scss';

interface Props {
  user: User;
  victim: User;
}
const KickNotification: FC<Props> = ({ user, victim }) => {
  const { firstName } = user;
  const { id, firstName: victimName } = victim;
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(deleteUser(id));
  };

  return (
    <div>
      <p>Kick player?</p>
      <p>
        ${firstName} want to kick member `${victimName}`. Do you agree with it?{' '}
      </p>
      <div className={classes.btnContainer}>
        <Button type="submit" text="Yes" colorButton="dark" onClick={handleClick} />
        <Button type="button" text="No" colorButton="light" />
      </div>
    </div>
  );
};

export { KickNotification };

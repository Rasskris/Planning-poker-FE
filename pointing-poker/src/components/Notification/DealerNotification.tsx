import { FC } from 'react';
import { useAppDispatch } from '../../hooks';
import { deleteUser } from '../../redux/thunks';
import { Button } from '..';
import { User } from '../../interfaces';
import classes from './Notification.module.scss';

const DealerNotification: FC<{ user: User }> = ({ user }) => {
  const { id, firstName } = user;
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(deleteUser(id));
  };

  return (
    <div>
      <p>Kick player?</p>
      <p>Are you really want to remove player `${firstName}` from game session?</p>
      <div className={classes.btnContainer}>
        <Button type="submit" text="Yes" colorButton="dark" onClick={handleClick} />
        <Button type="button" text="No" colorButton="light" />
      </div>
    </div>
  );
};

export { DealerNotification };

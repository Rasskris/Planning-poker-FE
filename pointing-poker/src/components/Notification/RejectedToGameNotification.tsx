import { FC } from 'react';
import { useAppDispatch } from '../../hooks';
import { BackDropModal, Button } from '..';
import { REJECTED_TO_GAME_TEXT } from '../../constants';
import { logout } from '../../redux/actions';
import classes from './Notification.module.scss';
import { setLogoutSuccessStatus } from '../../redux/slices';

interface INotificationProps {
  isVisible: boolean;
}

const RejectedToGameNotification: FC<INotificationProps> = ({ isVisible }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(logout());
    dispatch(setLogoutSuccessStatus());
  };

  return (
    <BackDropModal isBackDropOpen={isVisible}>
      <div className={classes.notification}>
        <p>{REJECTED_TO_GAME_TEXT}</p>
        <Button type="button" text="Ok" colorButton="dark" onClick={handleClick} />
      </div>
    </BackDropModal>
  );
};

export { RejectedToGameNotification };

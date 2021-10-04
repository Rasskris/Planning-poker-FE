import { FC } from 'react';
import { useAppDispatch } from '../../hooks';
import { BackDropModal, Button } from '..';
import { REJECTED_TO_GAME_TEXT } from '../../constants';
import { logout } from '../../redux/actions';
import { deleteUser } from '../../redux/thunks';
import classes from './Notification.module.scss';

interface INotificationProps {
  isVisible: boolean;
  currentUserId: string;
}

const RejectedToGameNotification: FC<INotificationProps> = ({ isVisible, currentUserId }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(deleteUser({ currentUserId }));
    dispatch(logout());
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

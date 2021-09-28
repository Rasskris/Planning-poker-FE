import { FC } from 'react';
import { useAppDispatch } from '../../hooks';
import { BackDropModal, Button } from '..';
import { deleteCurrentUser, resetRejectedStatus } from '../../redux/slices';
import { REDIRECT_TO_MAIN_TEXT, REJECTED_TO_GAME_TEXT } from '../../constants';
import classes from './Notification.module.scss';

interface INotificationProps {
  isVisible: boolean;
}

const RejectedToGameNotification: FC<INotificationProps> = ({ isVisible }) => {
  const dispatch = useAppDispatch();

  const handleClickYes = () => {
    dispatch(resetRejectedStatus());
    dispatch(deleteCurrentUser());
  };

  const handleClickNo = () => {
    dispatch(resetRejectedStatus());
  };

  return (
    <BackDropModal isBackDropOpen={isVisible}>
      <div className={classes.notification}>
        <p>{REJECTED_TO_GAME_TEXT}</p>
        <p>{REDIRECT_TO_MAIN_TEXT}</p>
        <div className={classes.btnContainer}>
          <Button type="button" text="Yes" colorButton="dark" onClick={handleClickYes} />
          <Button type="button" text="No" colorButton="light" onClick={handleClickNo} />
        </div>
      </div>
    </BackDropModal>
  );
};

export { RejectedToGameNotification };

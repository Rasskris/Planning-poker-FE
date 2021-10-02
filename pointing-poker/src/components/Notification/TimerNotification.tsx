import { FC } from 'react';
import { BackDropModal, Button } from '..';
import classes from './Notification.module.scss';

interface INotificationProps {
  isVisible: boolean;
  handleCloseModal: () => () => void;
}

const TimerNotification: FC<INotificationProps> = ({ isVisible, handleCloseModal }) => {
  return (
    <BackDropModal isBackDropOpen={isVisible}>
      <div className={classes.notification}>
        <p>Please, set timer values</p>
        <Button type="button" text="Ok" colorButton="dark" onClick={handleCloseModal()} />
      </div>
    </BackDropModal>
  );
};

export { TimerNotification };

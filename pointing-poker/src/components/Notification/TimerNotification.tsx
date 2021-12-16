import { FC } from 'react';
import { BackDropModal, Button } from '..';
import classes from './Notification.module.scss';

interface NotificationProps {
  isVisible: boolean;
  onCloseModal: () => () => void;
}

const TimerNotification: FC<NotificationProps> = ({ isVisible, onCloseModal }) => {
  return (
    <BackDropModal isBackDropOpen={isVisible}>
      <div className={classes.notification}>
        <p>Please, set timer values</p>
        <Button type="button" text="Ok" colorButton="dark" onClick={onCloseModal()} />
      </div>
    </BackDropModal>
  );
};

export { TimerNotification };

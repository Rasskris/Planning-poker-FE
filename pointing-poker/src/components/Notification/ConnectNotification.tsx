import { FC } from 'react';
import { Button } from '..';
import classes from './Notification.module.scss';

interface ConnectNotificationProps {
  onModalCloseHandler: () => void;
}

const ConnectNotification: FC<ConnectNotificationProps> = ({ onModalCloseHandler }) => {
  const handleClick = () => {
    console.log('adbjhas');
    onModalCloseHandler();
  };

  return (
    <div className={classes.notification}>
      <p className={classes.title}>Sorry, this game does not exist...</p>
      <Button type="button" text="OK" colorButton="light" onClick={handleClick} />
    </div>
  );
};

export { ConnectNotification };

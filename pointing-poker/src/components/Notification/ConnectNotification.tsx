import { FC } from 'react';
import { Button } from '..';
import classes from './Notification.module.scss';

interface ConnectNotificationProps {
  onModalCloseHandler: () => void;
}

const ConnectNotification: FC<ConnectNotificationProps> = ({ onModalCloseHandler }) => {
  const handleClick = () => {
    onModalCloseHandler();
  };

  return (
    <>
      <p className={classes.title}>Sorry, this game does not exist...</p>
      <Button type="button" text="OK" colorButton="dark" onClick={handleClick} />
    </>
  );
};

export { ConnectNotification };

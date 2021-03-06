import { FC } from 'react';
import { Button } from '..';
import classes from './Notification.module.scss';

interface INotificationProps {
  onModalCloseHandler: () => void;
}

const ConnectNotification: FC<INotificationProps> = ({ onModalCloseHandler }) => {
  const handleClick = () => {
    onModalCloseHandler();
  };

  return (
    <div className={classes.notification}>
      <p className={classes.title}>Sorry, this game does not exist...</p>
      <Button type="button" text="OK" colorButton="dark" onClick={handleClick} />
    </div>
  );
};

export { ConnectNotification };

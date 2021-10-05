import { FC } from 'react';
import { BackDropModal, Button } from '..';
import { SETTINGS_NOTIFICATION_TEXT } from '../../constants';
import classes from './Notification.module.scss';

interface INotificationProps {
  isVisible: boolean;
  handleCloseModal: () => () => void;
}

const SettingsNotification: FC<INotificationProps> = ({ isVisible, handleCloseModal }) => {
  return (
    <BackDropModal isBackDropOpen={isVisible}>
      <div className={classes.notification}>
        <p>{SETTINGS_NOTIFICATION_TEXT}</p>
        <Button type="button" text="Ok" colorButton="dark" onClick={handleCloseModal()} />
      </div>
    </BackDropModal>
  );
};

export { SettingsNotification };

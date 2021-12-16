import { FC, useEffect, useState, memo } from 'react';
import { useAppDispatch } from '../../hooks';
import { VictimData } from '../../interfaces';
import { deleteVictim } from '../../redux/thunks';
import { BackDropModal, Button } from '..';
import classes from './Notification.module.scss';

interface NotificationProps {
  victimData: VictimData | null;
  setVictimData: (victimData: VictimData | null) => void;
}

export const DealerNotification: FC<NotificationProps> = memo(({ victimData, setVictimData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (victimData) {
      setIsOpen(true);
    }
  }, [victimData]);

  const handleClickYes = () => {
    if (victimData) {
      dispatch(deleteVictim(victimData.id));
      setIsOpen(false);
      setVictimData(null);
    }
  };

  const handleClickNo = () => {
    setIsOpen(false);
    setVictimData(null);
  };

  return isOpen ? (
    <BackDropModal isBackDropOpen={isOpen}>
      <div className={classes.notification}>
        <p>Kick player?</p>
        <p>
          Are you really want to remove player <span className={classes.userName}>{victimData?.name}</span> from game
          session?
        </p>
        <div className={classes.btnContainer}>
          <Button type="button" text="Yes" colorButton="dark" onClick={handleClickYes} />
          <Button type="button" text="No" colorButton="light" onClick={handleClickNo} />
        </div>
      </div>
    </BackDropModal>
  ) : null;
});

DealerNotification.displayName = 'DealerNotification';

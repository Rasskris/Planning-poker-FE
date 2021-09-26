import { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { deleteUser } from '../../redux/thunks';
import { BackDropModal, Button } from '..';
import classes from './Notification.module.scss';

interface INotificationProps {
  currentUserId: string;
  victimData: {
    id: string;
    name: string;
  };
}

const DealerNotification: FC<INotificationProps> = ({ currentUserId, victimData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { id: victimId, name: victimName } = victimData;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (victimData.id) {
      setIsOpen(true);
    }
  }, [victimData]);

  const handleClickYes = () => {
    dispatch(deleteUser({ currentUserId, victimId }));
    setIsOpen(false);
  };

  const handleClickNo = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <BackDropModal isBackDropOpen={isOpen}>
          <div>
            <p>Kick player?</p>
            <p>Are you really want to remove player {victimName} from game session?</p>
            <div className={classes.btnContainer}>
              <Button type="button" text="Yes" colorButton="dark" onClick={handleClickYes} />
              <Button type="button" text="No" colorButton="light" onClick={handleClickNo} />
            </div>
          </div>
        </BackDropModal>
      )}
    </>
  );
};

export { DealerNotification };

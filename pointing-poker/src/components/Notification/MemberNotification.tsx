import { FC } from 'react';
import { useAppDispatch } from '../../hooks';
import { putVoteForKick } from '../../redux/thunks';
import { BackDropModal, Button } from '..';
import { IUser } from '../../interfaces';
import classes from './Notification.module.scss';
import { disableVote } from '../../redux/slices';

interface INotificationProps {
  isVoteActive: boolean;
  currentUserId: string;
  victim: IUser;
  userNameOpenedVote: string;
}

const MemberNotification: FC<INotificationProps> = ({ isVoteActive, currentUserId, victim, userNameOpenedVote }) => {
  const { firstName: victimName, gameId } = victim;
  const dispatch = useAppDispatch();

  const handleClickYes = () => {
    dispatch(putVoteForKick({ gameId, currentUserId }));
    dispatch(disableVote());
  };

  const handleClickNo = () => {
    dispatch(disableVote());
  };

  return (
    <BackDropModal isBackDropOpen={isVoteActive}>
      <div>
        <p>Kick player?</p>
        <p>
          {userNameOpenedVote} want to kick member {victimName}. Do you agree with it?{' '}
        </p>
        <div className={classes.btnContainer}>
          <Button type="submit" text="Yes" colorButton="dark" onClick={handleClickYes} />
          <Button type="button" text="No" colorButton="light" onClick={handleClickNo} />
        </div>
      </div>
    </BackDropModal>
  );
};

export { MemberNotification };

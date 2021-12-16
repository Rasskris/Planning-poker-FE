import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { putVoteAgainstKick, putVoteForKick } from '../../redux/thunks';
import { disableVote } from '../../redux/slices';
import { selectUserById, selectUserOpenedVote, selectVoteStatus, selectVoteVictim } from '../../redux/selectors';
import { BackDropModal, Button } from '..';
import classes from './Notification.module.scss';

interface NotificationProps {
  gameId: string;
  currentUserId: string;
}

const MemberNotification: FC<NotificationProps> = ({ gameId, currentUserId }) => {
  const userIdOpenedVote = useAppSelector(selectUserOpenedVote);
  const userOpenedVote = useAppSelector(state => selectUserById(state, userIdOpenedVote));
  const victim = useAppSelector(selectVoteVictim);
  const isVoteActive = useAppSelector(selectVoteStatus);
  const dispatch = useAppDispatch();

  const handleClickYes = () => {
    dispatch(putVoteForKick(gameId));
    dispatch(disableVote());
  };

  const handleClickNo = () => {
    dispatch(putVoteAgainstKick(gameId));
    dispatch(disableVote());
  };

  return isVoteActive && victim && userOpenedVote ? (
    <BackDropModal isBackDropOpen={isVoteActive}>
      <div className={classes.notification}>
        <p>Kick player?</p>
        <p>
          <span className={classes.userName}>{userOpenedVote.firstName}</span> want to kick member{' '}
          <span className={classes.userName}>{victim.firstName}</span>. Do you agree with it?{' '}
        </p>
        <div className={classes.btnContainer}>
          <Button type="button" text="Yes" colorButton="dark" onClick={handleClickYes} />
          <Button type="button" text="No" colorButton="light" onClick={handleClickNo} />
        </div>
      </div>
    </BackDropModal>
  ) : null;
};

export { MemberNotification };

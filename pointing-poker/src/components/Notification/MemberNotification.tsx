import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { putVoteForKick } from '../../redux/thunks';
import { BackDropModal, Button } from '..';
import { IUser } from '../../interfaces';
import { selectUserById, selectUserOpenedVote, selectVoteVictim } from '../../redux/selectors';
import classes from './Notification.module.scss';
import { disableVote } from '../../redux/slices';

interface IProps {
  isActiveVote: boolean;
  currentUserId: string;
}

const MemberNotification: FC<IProps> = ({ isActiveVote, currentUserId }) => {
  const userIdOpenedVote = useAppSelector(selectUserOpenedVote) as string;
  const { gameId, firstName: victimName } = useAppSelector(selectVoteVictim) as IUser;
  const { firstName: userNameOpenedVote } = useAppSelector(state => selectUserById(state, userIdOpenedVote)) as IUser;
  const dispatch = useAppDispatch();

  const handleClickYes = () => {
    dispatch(putVoteForKick({ gameId, currentUserId }));
    dispatch(disableVote());
  };

  const handleClickNo = () => {
    dispatch(disableVote());
  };

  return (
    <BackDropModal isBackDropOpen={isActiveVote}>
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

import { FC } from 'react';
import { BackDropModal, Button } from '..';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { resetAvailibleStatus } from '../../redux/slices/voteSlice';
import { VOTE_NOT_AVAILIBLE_TEXT, VOTE_AVAILIBLE_TEXT } from '../../constants';
import classes from './Notification.module.scss';

const VoteNotification: FC = () => {
  const { availible, notAvailible } = useAppSelector(state => state.vote);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(resetAvailibleStatus());
  };

  const button = <Button type="button" colorButton="dark" text="Ok" onClick={handleClick} />;

  return (
    <>
      {availible && (
        <BackDropModal isBackDropOpen={availible}>
          <div className={classes.notification}>
            <p>{VOTE_AVAILIBLE_TEXT}</p>
            {button}
          </div>
        </BackDropModal>
      )}
      {notAvailible && (
        <BackDropModal isBackDropOpen={notAvailible}>
          <div className={classes.notification}>
            <p>{VOTE_NOT_AVAILIBLE_TEXT}</p>
            {button}
          </div>
        </BackDropModal>
      )}
    </>
  );
};

export { VoteNotification };

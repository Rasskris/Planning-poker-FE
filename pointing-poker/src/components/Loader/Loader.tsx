import { FC } from 'react';
import { BackDropModal } from '..';
import { PENDING_MESSAGE } from '../../constants';
import classes from './Loader.module.scss';

interface ILoaderProps {
  isPendingDealerAnswer: boolean;
}

const Loader: FC<ILoaderProps> = ({ isPendingDealerAnswer }) => {
  return (
    <BackDropModal isBackDropOpen={isPendingDealerAnswer}>
      <div className={classes.spinner}>
        <span>{PENDING_MESSAGE}</span>
        <div className={classes.halfSpinner} />
      </div>
    </BackDropModal>
  );
};

export { Loader };
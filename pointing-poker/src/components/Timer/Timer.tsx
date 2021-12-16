import { FC } from 'react';
import { useAppSelector } from '../../hooks';
import { selectTimer } from '../../redux/selectors';
import classes from './Timer.module.scss';

const Timer: FC = () => {
  const { minutes, seconds } = useAppSelector(selectTimer);

  return (
    <div className={classes.timer}>
      <div className={classes.timer__minutes}>
        <p>minutes</p>
        <span>{minutes}</span>
      </div>
      <span className={classes.colon}>:</span>
      <div className={classes.timer__seconds}>
        <p>seconds</p>
        <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
      </div>
    </div>
  );
};

export { Timer };

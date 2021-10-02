import { FC } from 'react';
import classes from './Timer.module.scss';

interface TimerProps {
  minutes: number;
  seconds: number;
}

const Timer: FC<TimerProps> = ({ minutes, seconds }) => (
  <div className={classes.timer}>
    <div className={classes.timer__minutes}>
      <p>minutes</p>
      <span>{minutes}</span>
    </div>
    <span>:</span>
    <div className={classes.timer__seconds}>
      <p>seconds</p>
      <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
    </div>
  </div>
);

export { Timer };

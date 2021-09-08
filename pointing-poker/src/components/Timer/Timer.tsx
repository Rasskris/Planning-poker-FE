import React from 'react';
import styles from './Timer.module.scss';

interface TimerProps {
  minutes: number;
  seconds: number;
}

const Timer = ({ minutes, seconds }: TimerProps) => (
    <div className={styles.timer}>
      <div className={styles.timer__minutes}>
        <p>minutes</p>
        <p> {minutes}</p>
      </div>
      <div className={styles.timer__seconds}>
        <p>seconds</p>
        <p>
          <span>:</span>
          {seconds < 10 ? `0${seconds}` : seconds}
        </p>
      </div>
    </div>
);

export { Timer };

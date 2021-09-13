import React, { ChangeEvent } from 'react';
import styles from './Timer.module.scss';

interface TimerProps {
  minutes: number;
  seconds: number;
  editSetting: boolean;
  onChangeMinutes: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeSeconds: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Timer = ({ minutes, seconds, editSetting, onChangeMinutes, onChangeSeconds }: TimerProps) => (
  <div className={styles.timer}>
    <div className={styles.timer__minutes}>
      <p>minutes</p>
      {editSetting ? <input type="number" value={minutes} onChange={onChangeMinutes} /> : <p> {minutes}</p>}
    </div>
    <div className={styles.timer__seconds}>
      <p>seconds</p>
      <p>
        <span>:</span>
        {editSetting ? (
          <input type="number" value={seconds} onChange={onChangeSeconds} />
        ) : (
          <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
        )}
      </p>
    </div>
  </div>
);

export { Timer };

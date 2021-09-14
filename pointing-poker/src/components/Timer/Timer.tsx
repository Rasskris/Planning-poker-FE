import React, { ChangeEvent } from 'react';
import styles from './Timer.module.scss';

interface TimerProps {
  minutes: number;
  seconds: number;
  areSettingsEdited: boolean;
  onChangeMinutes: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeSeconds: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Timer = ({ minutes, seconds, areSettingsEdited, onChangeMinutes, onChangeSeconds }: TimerProps) => (
  <div className={styles.timer}>
    <div className={styles.timer__minutes}>
      <p>minutes</p>
      {areSettingsEdited ? <input type="number" value={minutes} onChange={onChangeMinutes} /> : <p> {minutes}</p>}
    </div>
    <div className={styles.timer__seconds}>
      <p>seconds</p>
      <p>
        <span>:</span>
        {areSettingsEdited ? (
          <input type="number" value={seconds} onChange={onChangeSeconds} />
        ) : (
          <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
        )}
      </p>
    </div>
  </div>
);

export { Timer };

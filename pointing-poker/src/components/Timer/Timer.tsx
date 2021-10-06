import React, { ChangeEvent, FC } from 'react';
import styles from './Timer.module.scss';

interface TimerProps {
  minutes: number;
  seconds: number;
  areSettingsEdited: boolean;
  onChangeMinutes: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeSeconds: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Timer: FC<TimerProps> = ({ minutes, seconds, areSettingsEdited, onChangeMinutes, onChangeSeconds }) => (
  <div className={styles.timer}>
    <div className={styles.timer__minutes}>
      <p className={styles.timer__word}>minutes</p>
      {areSettingsEdited ? (
        <input type="number" min="0" max="10" value={minutes} onChange={onChangeMinutes} />
      ) : (
        <p> {minutes}</p>
      )}
    </div>
    <div className={styles.timer__seconds}>
      <p className={styles.timer__word}>seconds</p>
      <p>
        <span>:</span>
        {areSettingsEdited ? (
          <input type="number" min="0" max="59" value={seconds} onChange={onChangeSeconds} />
        ) : (
          <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
        )}
      </p>
    </div>
  </div>
);

export { Timer };

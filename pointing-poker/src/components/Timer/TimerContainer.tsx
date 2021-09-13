import React, { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { Timer } from './Timer';

//https://stackoverflow.com/questions/40885923/countdown-timer-in-react

const START_COUNTDOWN_SECONDS = 59;
const DEFAULT_START_MINUTES = 0;
const DEFAULT_START_SECONDS = 0;

interface TimerContainerProps {
  initialMinute: number;
  initialSeconds: number;
  timerStarted: boolean;
  editSetting: boolean;
  onChangeTimer?: (arg0: {}) => void;
}

const TimerContainer = (props: TimerContainerProps) => {
  const { initialMinute, initialSeconds, timerStarted, editSetting, onChangeTimer } = props;
  const [minutes, setMinutes] = useState<number>(initialMinute);
  const [seconds, setSeconds] = useState<number>(initialSeconds);

  const handleChangeMinutes = (event: ChangeEvent<HTMLInputElement>) => {
    //TODO: add validation
    const { value } = event.target;
    setMinutes(+value);
    if (onChangeTimer) onChangeTimer({ minutes, seconds });
  };

  const handleChangeSeconds = (event: ChangeEvent<HTMLInputElement>) => {
    //TODO: add validation
    const { value } = event.target;
    setSeconds(+value);
    if (onChangeTimer) onChangeTimer({ minutes, seconds });
  };

  useEffect(() => {
    if (!timerStarted || editSetting) return;
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(START_COUNTDOWN_SECONDS);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <Timer
      minutes={minutes}
      seconds={seconds}
      editSetting={editSetting}
      onChangeMinutes={handleChangeMinutes}
      onChangeSeconds={handleChangeSeconds}
    />
  );
};

TimerContainer.defaultProps = {
  initialMinute: DEFAULT_START_MINUTES,
  initialSeconds: DEFAULT_START_SECONDS,
  timerStarted: false,
  editSetting: false,
};

export { TimerContainer };

import React, { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { Timer } from './Timer';

//https://stackoverflow.com/questions/40885923/countdown-timer-in-react

const START_COUNTDOWN_SECONDS = 59;

interface TimerContainerProps {
  initialMinute: number;
  initialSeconds: number;
  timerStarted: boolean;
  areSettingsEdited: boolean;
  onChangeTimer?: (time: { minutes: number; seconds: number }) => void;
  onStopTimer: () => void;
}

const TimerContainer = (props: TimerContainerProps) => {
  const { initialMinute, initialSeconds, timerStarted, areSettingsEdited, onChangeTimer, onStopTimer } = props;
  const [minutes, setMinutes] = useState<number>(initialMinute);
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [resetTimer, setResetTimer] = useState<boolean>(false);

  useEffect(() => {
    if (timerStarted) {
      setMinutes(initialMinute);
      setSeconds(initialSeconds);
      setResetTimer(false);
    }
  }, [initialMinute, initialSeconds, timerStarted]);

  useEffect(() => {
    if (minutes === 0 && seconds === 0 && !areSettingsEdited && !resetTimer) {
      setResetTimer(true);
      onStopTimer();
    }
  }, [areSettingsEdited, onStopTimer, minutes, resetTimer, seconds, timerStarted]);

  const handleChangeMinutes = (event: ChangeEvent<HTMLInputElement>) => {
    //TODO: add validation
    const { value } = event.target;
    setMinutes(+value);
    if (onChangeTimer) onChangeTimer({ minutes: +value, seconds });
  };

  const handleChangeSeconds = (event: ChangeEvent<HTMLInputElement>) => {
    //TODO: add validation
    const { value } = event.target;
    setSeconds(+value);
    if (onChangeTimer) onChangeTimer({ minutes, seconds: +value });
  };

  useEffect(() => {
    if (!timerStarted || areSettingsEdited) return;
    let timerInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timerInterval);
        } else {
          setSeconds(START_COUNTDOWN_SECONDS);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  });

  return (
    <Timer
      minutes={minutes}
      seconds={seconds}
      areSettingsEdited={areSettingsEdited}
      onChangeMinutes={handleChangeMinutes}
      onChangeSeconds={handleChangeSeconds}
    />
  );
};

TimerContainer.defaultProps = {
  timerStarted: false,
  areSettingsEdited: false,
  onStopTimer: () => {},
};

export { TimerContainer };

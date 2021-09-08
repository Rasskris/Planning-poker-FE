import React from 'react';
import { useState, useEffect } from 'react';
import { Timer } from './Timer';

//https://stackoverflow.com/questions/40885923/countdown-timer-in-react

const START_COUNTDOWN_SECONDS = 59;
const DEFAULT_START_MINUTES = 1;
const DEFAULT_START_SECONDS = 1;

interface TimerContainerProps {
  initialMinute: number;
  initialSeconds: number;
  timerStarted: boolean;
}

const TimerContainer = (props: TimerContainerProps) => {
  const { initialMinute, initialSeconds, timerStarted } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    if (!timerStarted) return;
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

  return <Timer minutes={minutes} seconds={seconds} />;
};

TimerContainer.defaultProps = {
  initialMinute: DEFAULT_START_MINUTES,
  initialSeconds: DEFAULT_START_SECONDS,
  timerStarted: false,
};

export { TimerContainer };

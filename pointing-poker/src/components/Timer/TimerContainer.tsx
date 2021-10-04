import React, { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { Timer } from './Timer';

//https://stackoverflow.com/questions/40885923/countdown-timer-in-react

interface TimerContainerProps {
  initialMinute: number;
  initialSeconds: number;
  timerStarted: boolean;
  areSettingsEdited: boolean;
  isRoundActive?: boolean;
  onChangeTimer?: (time: { minutes: number; seconds: number }) => void;
  onStopTimer: () => void;
}

const TimerContainer = (props: TimerContainerProps) => {
  const { initialMinute, initialSeconds, timerStarted, isRoundActive, areSettingsEdited, onChangeTimer, onStopTimer } =
    props;
  const [minutes, setMinutes] = useState<number>(initialMinute);
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [resetTimer, setResetTimer] = useState<boolean>(false);
  const { minutes: timeLeftMinutes, seconds: timeLeftSeconds } = useAppSelector(state => state.gameRound.timeLeft);

  useEffect(() => {
    if (isRoundActive) {
      setMinutes(initialMinute);
      setSeconds(initialSeconds);
      setResetTimer(false);
    }
  }, [initialMinute, initialSeconds, timerStarted, isRoundActive]);

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
    setMinutes(timeLeftMinutes);
    setSeconds(timeLeftSeconds);
  }, [areSettingsEdited, timeLeftMinutes, timeLeftSeconds, timerStarted]);

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

export const checkIsTimerValuesNotSetted = (minutes: number, seconds: number) => {
  if (minutes === 0 && seconds === 0) {
    return true;
  }
  return false;
};

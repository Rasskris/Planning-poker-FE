import { FC } from 'react';
import classes from './Spinner.module.scss';

interface SpinnerProps {
  text?: string;
}

const Spinner: FC<SpinnerProps> = ({ text }) => {
  return (
    <div className={classes.spinner}>
      {text && <p className={classes.text}>{text}</p>}
      <div className={classes.halfSpinner} />
    </div>
  );
};

export { Spinner };

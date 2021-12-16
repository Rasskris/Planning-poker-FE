import { FC } from 'react';
import classes from './DefaultContent.module.scss';

interface DefaultContentProps {
  text: string;
}

export const DefaultContent: FC<DefaultContentProps> = ({ text }) => {
  return (
    <div className={classes.border}>
      <p className={classes.text}>{text}</p>
    </div>
  );
};

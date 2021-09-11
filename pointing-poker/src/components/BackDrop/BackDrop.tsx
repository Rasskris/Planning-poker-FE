import React, { ChangeEventHandler } from 'react';
import classes from './BackDrop.module.scss';

interface IBackDrop {
  onBackDropHandler: ChangeEventHandler;
}

const BackDrop: React.FC<IBackDrop> = ({ onBackDropHandler }: IBackDrop): JSX.Element => {
  return <div className={classes.backdrop} onClick={onBackDropHandler} />;
};

export { BackDrop };

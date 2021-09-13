import React from 'react';
import classes from './BackDrop.module.scss';
import { Modal } from '../index';

interface IBackDrop {
  isBackDropOpen: boolean;
}

const BackDrop: React.FC<IBackDrop> = ({ isBackDropOpen }: IBackDrop): JSX.Element => {
  return <div className={classes.wrapper}>{isBackDropOpen ? <Modal title={'Connect to lobby'} /> : null}</div>;
};

export { BackDrop };

import React from 'react';
import classes from './BackDrop.module.scss';
import { Modal } from '../index';

interface IBackDrop {
  isBackDropOpen: boolean;
  titleModal: string;
  children: any;
}

const BackDrop: React.FC<IBackDrop> = ({ isBackDropOpen, titleModal, children }: IBackDrop): JSX.Element => {
  return (
    <div className={classes.wrapper}>{isBackDropOpen ? <Modal title={titleModal} children={children} /> : null}</div>
  );
};

export { BackDrop };

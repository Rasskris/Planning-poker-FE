import React from 'react';
import classes from './BackDropModal.module.scss';
import { Modal } from '../index';

interface IBackDrop {
  isBackDropOpen: boolean;
  titleModal: string;
  children: any;
}

const BackDropModal: React.FC<IBackDrop> = ({ isBackDropOpen, titleModal, children }: IBackDrop): JSX.Element => (
    <div className={classes.wrapper}>{isBackDropOpen ? <Modal title={titleModal}>{children}</Modal> : null}</div>
  );

export { BackDropModal };

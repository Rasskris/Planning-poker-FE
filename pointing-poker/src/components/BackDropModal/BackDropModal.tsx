import { FC } from 'react';
import { Modal } from '../index';
import classes from './BackDropModal.module.scss';

interface BackDropProps {
  isBackDropOpen: boolean;
  titleModal?: string;
  children: any;
}

const BackDropModal: FC<BackDropProps> = ({ isBackDropOpen, titleModal, children }) => {
  return <>{isBackDropOpen && <div className={classes.wrapper}>{<Modal title={titleModal}>{children}</Modal>}</div>}</>;
};

export { BackDropModal };

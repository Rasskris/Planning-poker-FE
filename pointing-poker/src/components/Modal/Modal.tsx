import { FC, ReactNode } from 'react';
import classes from './Modal.module.scss';

interface IModalProps {
  title?: string;
  children: ReactNode;
}

const Modal: FC<IModalProps> = ({ title, children }) => {
  return (
    <div className={classes.wrapper}>
      <h2 className={classes.header}>{title}</h2>
      {children}
    </div>
  );
};

export { Modal };

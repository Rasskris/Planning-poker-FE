import React from 'react';
import classes from './Modal.module.scss';

interface IModalProps {
  title: string;
  children: Node | Node[] | string;
}

const Modal: React.FC<IModalProps> = ({ title, children }: IModalProps): JSX.Element => {
  return (
    <div className={classes.wrapper}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export { Modal };

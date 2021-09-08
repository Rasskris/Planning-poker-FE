import React from 'react';
import classes from './ChatButton.module.scss';
import { IClasses } from '../../interfaces/IClasses';

interface IChatButtonProps {
  isOpen: boolean;
  openChatHandler: (event: React.MouseEvent) => void;
}

const ChatButton: React.FC<IChatButtonProps> = (props: IChatButtonProps): JSX.Element => {
  const incomingClasses: IClasses = { ...classes };
  let clsIsOpen = !props.isOpen ? incomingClasses.logo_open : incomingClasses.logo_close;
  const chatButtonClasses: string = [incomingClasses.logo, clsIsOpen].join(' ');

  return (
    <div className={chatButtonClasses} onClick={props.openChatHandler}>
      <div className={classes.logo_icon} />
    </div>
  );
};

export { ChatButton };

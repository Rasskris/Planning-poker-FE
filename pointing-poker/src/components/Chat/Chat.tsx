import React from 'react';
import classes from './Chat.module.scss';
import { IClasses } from '../../interfaces/IClasses';

interface IChatProps {
  isOpen: boolean;
  openChatHandler: (event: React.MouseEvent) => void;
}

const Chat: React.FC<IChatProps> = (props: IChatProps): JSX.Element => {
  const incomingClasses: IClasses = { ...classes };
  let clsIsOpen = !props.isOpen ? incomingClasses.logo_open : incomingClasses.logo_close;
  const cls: string[] = [incomingClasses.logo, clsIsOpen];

  return (
    <a className={cls.join(' ')} onClick={props.openChatHandler}>
      <div className={classes.logo_icon} />
    </a>
  );
};

export default Chat;

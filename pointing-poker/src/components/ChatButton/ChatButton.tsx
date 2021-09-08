import React from 'react';
import classes from './ChatButton.module.scss';
import { IClasses } from '../../interfaces/IClasses';

interface IChatButtonProps {
  isChatOpen: boolean;
  onOpenChatHandler: (event: React.MouseEvent) => void;
}

const ChatButton: React.FC<IChatButtonProps> = (props: IChatButtonProps): JSX.Element => {
  const incomingClasses: IClasses = { ...classes };
  const chatButtonIsOpen = !props.isChatOpen ? incomingClasses.logo_open : incomingClasses.logo_close;
  const chatButtonClasses: string = [incomingClasses.logo, chatButtonIsOpen].join(' ');

  return (
    <div className={chatButtonClasses} onClick={props.onOpenChatHandler}>
      <div className={classes.logo_icon} />
    </div>
  );
};

export { ChatButton };

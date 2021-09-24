import { FC } from 'react';
import { IClasses } from '../../interfaces/IClasses';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectChatStatus } from '../../redux/selectors';
import { changeChatStatus } from '../../redux/slices';
import classes from './ChatButton.module.scss';

const ChatButton: FC = () => {
  const isChatOpen = useAppSelector(selectChatStatus);
  const incomingClasses: IClasses = { ...classes };
  const chatButtonIsOpen = !isChatOpen ? incomingClasses.logo_open : incomingClasses.logo_close;
  const chatButtonClasses: string = [incomingClasses.logo, chatButtonIsOpen].join(' ');
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(changeChatStatus(!isChatOpen));
  };

  return (
    <div className={chatButtonClasses} onClick={handleClick}>
      <div className={classes.logo_icon} />
    </div>
  );
};

export { ChatButton };

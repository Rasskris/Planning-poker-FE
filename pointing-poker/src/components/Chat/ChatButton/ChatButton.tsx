import { FC } from 'react';
import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectChatStatus } from '../../../redux/selectors';
import { changeChatStatus } from '../../../redux/slices';
import classes from './ChatButton.module.scss';

const ChatButton: FC = () => {
  const isChatOpen = useAppSelector(selectChatStatus);
  const chatButtonClasses = classnames(classes.logo, {
    [classes.logo_open]: !isChatOpen,
    [classes.logo_close]: isChatOpen,
  });
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

import { FC } from 'react';
import { ChatButton } from '../index';
import { useAppSelector } from '../../hooks';
import { selectChatStatus, selectCurrentUser } from '../../redux/selectors';
import { Chat } from '../Chat';
import classes from './Header.module.scss';

const Header: FC = () => {
  const isChatOpen = useAppSelector(selectChatStatus);
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <div className={classes.header}>
      <div className={classes.wrapper}>
        <div className={classes.background}>
          <div className={classes.background_darkBlue} />
        </div>
        <div className={classes.icons}>
          <div className={classes.logo} />
          {currentUser && <ChatButton />}
        </div>
        {currentUser && isChatOpen && (
          <div className={classes.chat}>
            <Chat currentUser={currentUser} />
          </div>
        )}
      </div>
    </div>
  );
};

export { Header };

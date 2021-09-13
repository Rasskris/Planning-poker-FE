import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './Header.module.scss';
import { ChatButton } from '../index';
import { RootState } from '../../store/store';

const Header: React.FC = (): JSX.Element => {
  const currentState = useSelector((state: RootState) => state.user.user);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChatHandler = (): void => {
    setIsChatOpen(!isChatOpen);
  };
  return (
    <div className={classes.header}>
      <div className={classes.wrapper}>
        <div className={classes.background}>
          <div className={classes.background_darkBlue} />
          <div className={classes.background_blue} />
        </div>
        <div className={classes.icons}>
          <div className={classes.logo}>
            <div className={classes.logo_icon} />
          </div>
          {currentState.isLogin ? <ChatButton isChatOpen={isChatOpen} onOpenChatHandler={openChatHandler} /> : null}
        </div>
      </div>
    </div>
  );
};

export { Header };

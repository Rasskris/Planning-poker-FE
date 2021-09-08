import React, { useState } from 'react';
import classes from './Header.module.scss';
import { ChatButton } from '../ChatButton/ChatButton';

const Header: React.FC = (): JSX.Element => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

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
          {isLogin ? <ChatButton isChatOpen={isChatOpen} onOpenChatHandler={openChatHandler} /> : null}
        </div>
      </div>
    </div>
  );
};

export { Header };

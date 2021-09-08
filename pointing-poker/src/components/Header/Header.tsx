import React, { useState } from 'react';
import classes from './Header.module.scss';
import { ChatButton } from '../ChatButton/ChatButton';

const Header: React.FC = (): JSX.Element => {
  const [isChatOpen, setChatOpen] = useState(false);
  const [isLogin, setLogin] = useState(true);
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
          {isLogin ? <ChatButton isOpen={isChatOpen} openChatHandler={() => setChatOpen(!isChatOpen)} /> : null}
        </div>
      </div>
    </div>
  );
};

export { Header };

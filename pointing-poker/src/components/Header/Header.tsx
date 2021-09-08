import React, { useState } from 'react';
import classes from './Header.module.scss';
import { ChatButton } from '../ChatButton/ChatButton';

const Header: React.FC = (): JSX.Element => {
  const [chatOpen, setChatOpen] = useState(false);
  const [login, setLogin] = useState(true);
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
          {login ? <ChatButton isOpen={chatOpen} openChatHandler={() => setChatOpen(!chatOpen)} /> : null}
        </div>
      </div>
    </div>
  );
};

export { Header };

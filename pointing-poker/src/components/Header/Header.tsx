import React, { useState } from 'react';
import { ChatButton } from '../index';
import { useAppSelector } from '../../hooks';
import { selectLoginStatus } from '../../redux/selectors';
import classes from './Header.module.scss';

const Header: React.FC = (): JSX.Element => {
  const isLogin = useAppSelector(selectLoginStatus);
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
          {isLogin ? <ChatButton isChatOpen={isChatOpen} onOpenChatHandler={openChatHandler} /> : null}
        </div>
      </div>
    </div>
  );
};

export { Header };

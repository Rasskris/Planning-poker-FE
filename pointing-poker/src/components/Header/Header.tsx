import React from 'react';
import classes from './Header.module.scss';
import Chat from '../Chat/Chat';

const Header: React.FC = (): JSX.Element => {
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
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Header;

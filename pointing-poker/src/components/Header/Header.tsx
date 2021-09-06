import React from 'react';
import classes from './Header.module.scss';

const Header: React.FC = (): JSX.Element => {
  return (
    <div className={classes.header}>
      <div className={classes.wrapper}>
        <div className={classes.background}>
          <div className={classes.background_darkBlue} />
          <div className={classes.background_blue} />
        </div>
        <div className={classes.icons}>
          <div className={classes.icons__logo}>
            <div className={classes.icons__logo_icon} />
          </div>
          <div className={classes.icons__chat}>
            <div className={classes.icons__chat_icon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

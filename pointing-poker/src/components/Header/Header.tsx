import React from 'react';
import classes from './Header.module.scss';

const Header: React.FC = (): JSX.Element => {
  return (
    <div className={classes.header}>
      <div className={classes.header__wrapper}>
        <div className={classes.header__background}>
          <div className={classes.header__background_darkBlue} />
          <div className={classes.header__background_blue} />
        </div>
        <div className={classes.header__icons}>
          <div className={classes.header__icons__logo}>
            <div className={classes.header__icons__logo_icon} />
          </div>
          <div className={classes.header__icons__chat}>
            <div className={classes.header__icons__chat_icon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

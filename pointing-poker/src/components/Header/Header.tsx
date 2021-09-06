import React from 'react';
import classes from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <div className={classes.header}>
      <div className={classes.header__wrapper}>
        <div className={classes.header__logo}>
          <div className={classes.header__logo__icon} />
        </div>
        <div className={classes.header__wrapper_darkBlue} />
        <div className={classes.header__wrapper_blue} />
      </div>
    </div>
  );
};

export default Header;

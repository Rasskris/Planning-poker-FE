import React from 'react';
import classes from './Footer.module.scss';

const Footer: React.FC = (): JSX.Element => {
  return (
    <div className={classes.footer}>
      <div className={classes.wrapper}>
        <div className={classes.logo}>
          <div className={classes.logo_icon} />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Footer;

import React from 'react';
import classes from './Footer.module.scss';

const Footer: React.FC = (): JSX.Element => {
  return (
    <div className={classes.footer}>
      <div className={classes.wrapper}>
        <a className={classes.logo} href={'https://rs.school/react/'}>
          <div className={classes.logo_icon} />
        </a>
        <div className={classes.copyright}></div>
      </div>
    </div>
  );
};

export default Footer;

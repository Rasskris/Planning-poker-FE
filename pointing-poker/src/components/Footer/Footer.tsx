import React from 'react';
import classes from './Footer.module.scss';

const Footer: React.FC = (): JSX.Element => {
  return (
    <div className={classes.footer}>
      <div className={classes.wrapper}>
        <a className={classes.logo} href={'https://rs.school/react/'}>
          <div className={classes.logo_icon} />
        </a>
        <div className={classes.copyright}>
          <p className={classes.copyright__text}>
            Made by:
            <a className={classes.copyright__text_link} href="https://github.com/elenaniksy">
              @elenaniksy
            </a>
            <a className={classes.copyright__text_link} href="https://github.com/Nine-eleven">
              @nine-eleven
            </a>
            <a className={classes.copyright__text_link} href="https://github.com/Rasskris">
              @rasskris
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

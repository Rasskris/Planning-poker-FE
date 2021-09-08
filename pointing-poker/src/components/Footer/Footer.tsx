import React from 'react';
import classes from './Footer.module.scss';

const PROJECT_MEMBERS: string[] = ['elenaniksy', 'nine-eleven', 'rasskris'];

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
            {PROJECT_MEMBERS.map((member: string, index: number) => {
              return (
                <a className={classes.copyright__text_link} href={`https://github.com/${member}`} key={index}>
                  @{member}
                </a>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export { Footer };

import React from 'react';
import classes from './Chat.module.scss';

const Chat: React.FC = (): JSX.Element => {
  return (
    <div className={classes.logo}>
      <div className={classes.logo_icon} />
    </div>
  );
};

export default Chat;

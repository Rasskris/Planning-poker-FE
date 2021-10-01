import { FC } from 'react';
import { ChatButton } from '../index';
import { useAppSelector } from '../../hooks';
import { selectLoginStatus } from '../../redux/selectors';
import classes from './Header.module.scss';

const Header: FC = () => {
  const isLogin = useAppSelector(selectLoginStatus);

  return (
    <div className={classes.header}>
      <div className={classes.wrapper}>
        <div className={classes.background}>
          <div className={classes.background_darkBlue} />
        </div>
        <div className={classes.icons}>
          <div className={classes.logo} />
          {isLogin && <ChatButton />}
        </div>
      </div>
    </div>
  );
};

export { Header };

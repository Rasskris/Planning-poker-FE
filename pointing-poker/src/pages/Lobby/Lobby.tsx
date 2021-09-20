import { FC } from 'react';
import { useAppSelector } from '../../hooks';
import { selectCurrentUser } from '../../redux/selectors';
import { IssueList, Chat, UserList, Button, GameSettings } from '../../components';
import { USER_ROLES } from '../../constants';
import { User } from '../../interfaces';
import classes from './Lobby.module.scss';

const Lobby: FC = () => {
  const user = useAppSelector(selectCurrentUser) as User;
  const isDealer = user.role === USER_ROLES.DEALER;

  return (
    <section className={classes.lobby}>
      <div className={classes.content}>
        {isDealer && (
          <div className={classes.wrapper}>
            <h3>Game ID:</h3>
            <p>{user.gameId}</p>
            <Button text="Start Game" colorButton="dark" type="button" />
          </div>
        )}
        <div className={classes.wrapper}>
          <UserList currentUser={user} />
        </div>
        <div className={classes.wrapper}>
          <IssueList currentUser={user} />
        </div>
        {isDealer && (
          <div className={classes.wrapper}>
            <GameSettings />
          </div>
        )}
      </div>
      <div className={classes.chat}>
        <Chat currentUser={user} />
      </div>
    </section>
  );
};

export { Lobby };

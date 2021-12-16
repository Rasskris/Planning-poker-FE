import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { BackDropModal, Button, LoginForm } from '../../components/index';
import { TOAST_OPTIONS } from '../../constants';
import { USER_ROLES } from '../../enums';
import { useDispatchWithReturn } from '../../hooks';
import { checkExistGame } from '../../redux/thunks';
import classes from './Main.module.scss';

const Main: FC = () => {
  const [gameId, setGameId] = useState('');
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [role, setRole] = useState<USER_ROLES | null>(null);
  const [dispatch] = useDispatchWithReturn();

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setGameId(target.value);
  };

  const handleStartGame = () => {
    setRole(USER_ROLES.DEALER);
    setIsLoginFormOpen(true);
    setGameId('');
  };

  const handleConnectGame = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(checkExistGame(gameId));

      setRole(USER_ROLES.PLAYER);
      setIsLoginFormOpen(true);
    } catch (error: any) {
      toast.error(error.message, TOAST_OPTIONS);
    }
  };

  const handleCloseModal = () => {
    setIsLoginFormOpen(false);
  };

  return (
    <div className={classes.wrapper}>
      {isLoginFormOpen && (
        <BackDropModal isBackDropOpen={isLoginFormOpen} titleModal="Connect to lobby">
          <LoginForm gameId={gameId} onModalCloseHandler={handleCloseModal} role={role as USER_ROLES} />
        </BackDropModal>
      )}
      <p className={classes.logo}>Poker Planning </p>
      <h1 className={classes.header}>Start your planning:</h1>
      <div className={classes.create}>
        <p>Create session:</p>
        <Button text="Start new game" colorButton="dark" type="button" onClick={handleStartGame} />
      </div>
      <p className={classes.header}>OR:</p>
      <div className={classes.connect}>
        <form className={classes.form} onSubmit={handleConnectGame}>
          <label>
            Connect to lobby by URL:
            <input type="text" value={gameId} onChange={handleChange} required />
          </label>
          <Button type="submit" text="Connect" colorButton="dark" />
        </form>
      </div>
    </div>
  );
};

export { Main };

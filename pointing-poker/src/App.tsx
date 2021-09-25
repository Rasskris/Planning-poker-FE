import { FC, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import type { Socket } from 'socket.io-client';
import { initSocket } from './libs';
import { useAppDispatch, useAppSelector } from './hooks';
import { selectCurrentUser, selectLoginStatus, selectStatusGame } from './redux/selectors';
import { Header, Footer } from './components';
import { Main, Lobby, Game } from './pages';
import classes from './App.module.scss';

const App: FC = () => {
  const socket = useRef<Socket>();
  const isLogin = useAppSelector(selectLoginStatus);
  const isStartedGame = useAppSelector(selectStatusGame);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const isSocketDissconnect = () => !socket.current || socket.current.disconnected;

  useEffect(() => {
    if (isSocketDissconnect() && currentUser) {
      socket.current = initSocket(currentUser.id, currentUser.gameId, dispatch);
    }

    return () => {
      if (socket.current?.connected) {
        socket.current.disconnect();
      }
    };
  }, [currentUser, dispatch, socket]);

  return (
    <div className={classes.app}>
      <Header />
      <Router>
        <Route exact path="/">
          {isLogin ? <Redirect to="/lobby" /> : <Main />}
        </Route>
        <Route path="/lobby">
          {isLogin ? <Lobby /> : <Redirect to="/" />}
          {isStartedGame && <Redirect to="/game" />}
        </Route>
        <Route path="/game">
          {isStartedGame ? <Game /> : <Redirect to="/lobby" />}
          {!isLogin && <Main />}
        </Route>
      </Router>
      <Footer />
    </div>
  );
};

export default App;

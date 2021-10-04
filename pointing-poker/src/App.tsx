import { FC, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import type { Socket } from 'socket.io-client';
import { initSocket } from './libs';
import { useAppDispatch, useAppSelector } from './hooks';
import { selectCurrentUser, selectLoginStatus, selectGameStatus } from './redux/selectors';
import { Header, Footer } from './components';
import { Main, Lobby, Game } from './pages';
import classes from './App.module.scss';
import { GameStatisticsPage } from './pages/GameStatisticsPage';

const App: FC = () => {
  const socket = useRef<Socket>();
  const isLogin = useAppSelector(selectLoginStatus);
  const isGameStarted = useAppSelector(selectGameStatus);
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
          {isLogin && currentUser ? <Lobby currentUser={currentUser} /> : <Redirect to="/" />}
          {isGameStarted && <Redirect to="/game" />}
        </Route>
        <Route path="/game">
          {isGameStarted && currentUser ? <Game currentUser={currentUser} /> : <Redirect to="/lobby" />}
          {!isLogin && <Main />}
        </Route>
        <Route path="/statistics">{<GameStatisticsPage currentUser={currentUser} />}</Route>
      </Router>
      <Footer />
    </div>
  );
};

export default App;

import { FC, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { Socket } from 'socket.io-client';
import { initSocket } from './libs';
import { useAppDispatch, useAppSelector } from './hooks';
import { selectCurrentUser, selectLoginStatus, selectGameStatus } from './redux/selectors';
import { Header, Footer } from './components';
import { Main, Lobby, Game, Statistics } from './pages';
import classes from './App.module.scss';

const App: FC = () => {
  const socket = useRef<Socket>();
  const isLoggedIn = useAppSelector(selectLoginStatus);
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
          {isLoggedIn ? <Redirect to="/lobby" /> : <Main />}
        </Route>
        <Route path="/lobby">
          {isLoggedIn && currentUser ? <Lobby currentUser={currentUser} /> : <Redirect to="/" />}
          {isGameStarted && <Redirect to="/game" />}
        </Route>
        <Route path="/game">
          {isGameStarted && currentUser ? <Game currentUser={currentUser} /> : <Redirect to="/lobby" />}
          {!isLoggedIn && <Main />}
        </Route>
        <Route path="/statistics">
          <Statistics />
        </Route>
      </Router>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default App;

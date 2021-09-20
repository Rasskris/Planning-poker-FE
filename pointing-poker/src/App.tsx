import { FC, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import type { Socket } from 'socket.io-client';
import { initSocket } from './libs';
import { useAppDispatch, useAppSelector } from './hooks';
import { selectCurrentUser, selectLoginStatus } from './redux/selectors';
import { Header, Footer } from './components';
import { Lobby, Main } from './pages';
import classes from './App.module.scss';

const App: FC = () => {
  const socket = useRef<Socket>();
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(selectLoginStatus);
  const currentUser = useAppSelector(selectCurrentUser);

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
  });

  return (
    <div className={classes.app}>
      <Header />
      <Router>
        <Route exact path="/">
          {isLogin ? <Redirect to="/lobby" /> : <Main />}
        </Route>
        <Route path="/lobby">
          <Lobby />
        </Route>
      </Router>
      <Footer />
    </div>
  );
};

export default App;

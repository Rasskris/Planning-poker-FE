import React from 'react';
import { useDispatch } from 'react-redux';
import classes from './App.module.scss';
import { Header, Footer, TimerContainer } from './components';
import { GameSettings } from './components/GameSettings';

const App: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className={classes.app}>
      <Header />
      <GameSettings />
      <Footer />
      <TimerContainer timerStarted />
    </div>
  );
};

export default App;

import React from 'react';
import classes from './App.module.scss';
import Header from './components/Header/Header';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <h1 className={classes.header}>Pointing Poker</h1>
    </div>
  );
};

export default App;

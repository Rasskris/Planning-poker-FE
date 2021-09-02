import React from 'react';
import classes from './App.module.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      {/*  test header in component to show, that styles added*/}
      <h1 className={classes.header}>Pointing Poker</h1>
    </div>
  );
}

export default App;

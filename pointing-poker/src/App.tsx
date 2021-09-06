import React from 'react';
import classes from './App.module.scss';
import Header from './components/Header/Header';

const App: React.FC = () => {
  return (
    <div className={classes.app}>
      <Header />
    </div>
  );
};

export default App;

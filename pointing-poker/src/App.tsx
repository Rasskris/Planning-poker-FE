import React from 'react';
import classes from './App.module.scss';
import { Header, Footer } from './components';

const App: React.FC = () => {
  return (
    <div className={classes.app}>
      <Header />
      <Footer />
    </div>
  );
};

export default App;

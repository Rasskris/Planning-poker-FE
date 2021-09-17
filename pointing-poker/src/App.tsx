import React from 'react';
import classes from './App.module.scss';
import { Header, MainPage, Footer } from './components';

const App: React.FC = () => {
  return (
    <div className={classes.app}>
      <Header />
      <MainPage />
      <Footer />
    </div>
  );
};

export default App;

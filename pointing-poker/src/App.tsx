import React from 'react';
import classes from './App.module.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App: React.FC = () => {
  return (
    <div className={classes.app}>
      <Header />
      <Footer />
    </div>
  );
};

export default App;

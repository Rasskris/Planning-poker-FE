import React from 'react';
import { useDispatch } from 'react-redux';
import classes from './App.module.scss';
import { Header, MainPage, Footer } from './components';
import { addUser } from './store/slices/userSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className={classes.app}>
      <Header />
      <MainPage />
      <Footer />
    </div>
  );
};

export default App;

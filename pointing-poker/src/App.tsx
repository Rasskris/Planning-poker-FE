import React from 'react';
import { useDispatch } from 'react-redux';
import classes from './App.module.scss';
import { Header, Footer } from './components';
import { addUser } from './store/slices/userSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className={classes.app}>
      <Header />
      <Footer />
    </div>
  );
};

export default App;

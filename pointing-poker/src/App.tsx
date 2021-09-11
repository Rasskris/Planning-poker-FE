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
      <button
        onClick={() => {
          dispatch(
            addUser({
              firstName: 'Jdhde',
              lastName: 'ghghg',
              jobPosition: 'ghghgh',
              image: 'ggggdd',
              observer: false,
              role: 'none',
            }),
          );
        }}
      >
        Click
      </button>
      <Footer />
    </div>
  );
};

export default App;

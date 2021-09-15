import React, { useState } from 'react';
import classes from './MainPage.module.scss';
import { useDispatch } from 'react-redux';
import { addRole } from '../../store/slices/userSlice';
import { Button, Input, BackDrop, Form } from '../index';
import { InputLayoutTypes } from '../../interfaces/InputLayoutTypes';
import { UserRole } from '../../interfaces/UserRole';

const CONNECT = {
  id: 'connect',
};

const CREATE = {
  id: 'create',
};

const MainPage: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onModalHandler = (event: React.MouseEvent): void => {
    const target = event.target as HTMLButtonElement;
    const id = target.id;

    if (!isModalOpen) {
      setIsModalOpen(!isModalOpen);
    }

    switch (id) {
      case 'connect':
        dispatch(addRole(UserRole.player));
        break;

      case 'create':
        dispatch(addRole(UserRole.master));
        break;

      default:
        break;
    }
  };

  const onModalCloseHandler = () => {
    if (isModalOpen) {
      setIsModalOpen(!isModalOpen);
    }
  };

  return (
    <div className={classes.wrapper}>
      {isModalOpen ? (
        <BackDrop
          isBackDropOpen={true}
          titleModal={'Connect to lobby'}
          children={<Form onModalCloseHandler={onModalCloseHandler} />}
        />
      ) : null}
      <div className={classes.logo}>
        <div className={classes.logo_icon} />
      </div>
      <h1 className={classes.header}>Start your planning:</h1>
      <div className={classes.create}>
        <p>Create session:</p>
        <Button children="Start new game" colorButton="dark" onClick={onModalHandler} {...CREATE} />
      </div>
      <p className={classes.header}>OR:</p>
      <div className={classes.connect}>
        <Input
          layout={InputLayoutTypes.column}
          type={'text'}
          label={'Connect to lobby by URL:'}
          value={''}
          onChangeInputHandler={() => {
            console.log('input url');
          }}
        />
        <Button children="Connect" colorButton="dark" onClick={onModalHandler} {...CONNECT} />
      </div>
    </div>
  );
};

export { MainPage };

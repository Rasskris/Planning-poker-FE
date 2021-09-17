import React, { useState } from 'react';
import classes from './MainPage.module.scss';
import { BackDropModal, Button, Form, Input } from '../index';
import { InputLayoutTypes } from '../../interfaces/InputLayoutTypes';
import { UserRole } from '../../interfaces/User';

const CONNECT = {
  id: 'connect',
};

const CREATE = {
  id: 'create',
};

const MainPage: React.FC = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [role, setRole] = useState<null | UserRole>(null);

  const onModalHandler = (event: React.MouseEvent): void => {
    const target = event.target as HTMLButtonElement;
    const id = target.id;

    if (!isModalOpen) {
      setIsModalOpen(!isModalOpen);
    }

    switch (id) {
      case 'connect':
        setRole(UserRole.player);
        break;

      case 'create':
        setRole(UserRole.dealer);
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
        <BackDropModal
          isBackDropOpen
          titleModal={'Connect to lobby'}
          children={<Form onModalCloseHandler={onModalCloseHandler} role={role ? role : null} />}
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
            //TODO: implement function to add existing game link
            console.log('input url');
          }}
        />
        <Button children="Connect" colorButton="dark" onClick={onModalHandler} {...CONNECT} />
      </div>
    </div>
  );
};

export { MainPage };

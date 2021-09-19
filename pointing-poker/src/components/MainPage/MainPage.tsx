import React, { useState } from 'react';
import classes from './MainPage.module.scss';
import { BackDropModal, Button, Form, Input } from '../index';
import { InputLayoutTypes } from '../../interfaces/InputLayoutTypes';
import { USER_ROLES } from '../../constants';

const CONNECT = {
  id: 'connect',
};

const CREATE = {
  id: 'create',
};

const MainPage: React.FC = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [role, setRole] = useState<null | USER_ROLES>(null);

  const onModalHandler = (event: React.MouseEvent): void => {
    const target = event.target as HTMLButtonElement;
    const id = target.id;

    if (!isModalOpen) {
      setIsModalOpen(!isModalOpen);
    }

    switch (id) {
      case CONNECT.id:
        setRole(USER_ROLES.PLAYER);
        break;

      case CREATE.id:
        setRole(USER_ROLES.DEALER);
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
          children={<Form onModalCloseHandler={onModalCloseHandler} role={role || null} />}
        />
      ) : null}
      <div className={classes.logo}>
        <div className={classes.logo_icon} />
      </div>
      <h1 className={classes.header}>Start your planning:</h1>
      <div className={classes.create}>
        <p>Create session:</p>
        <Button text="Start new game" colorButton="dark" type="button" onClick={onModalHandler} id={CONNECT.id} />
      </div>
      <p className={classes.header}>OR:</p>
      <div className={classes.connect}>
        <Input
          layout={InputLayoutTypes.column}
          type="text"
          label="Connect to lobby by URL:"
          value={''}
          onChangeInputHandler={() => {
            //TODO: implement function to add existing game link
            console.log('input url');
          }}
        />
        <Button text="Connect" colorButton="dark" onClick={onModalHandler} type="button" id={CREATE.id} />
      </div>
    </div>
  );
};

export { MainPage };

import React from 'react';
import classes from './MainPage.module.scss';
import { useSelector } from 'react-redux';
import { Button, Input, BackDrop, Switcher, Form } from '../index';
import { InputLayoutTypes } from '../../interfaces/InputLayoutTypes';
import { RootState } from '../../store/store';

const MainPage: React.FC = (): JSX.Element => {
  const currentState = useSelector((state: RootState) => state.user.user);
  return (
    <div className={classes.wrapper}>
      <BackDrop
        isBackDropOpen={true}
        titleModal={'Connect to lobby'}
        children={[
          <Switcher
            switchState={currentState.observer}
            name="formSwitcher"
            children={'Connect as Observer'}
            onClick={() => {
              console.log('switcher');
            }}
          />,
          <Form />,
        ]}
      />
      <div className={classes.logo}>
        <div className={classes.logo_icon} />
      </div>
      <h1 className={classes.header}>Start your planning:</h1>
      <div className={classes.create}>
        <p>Create session:</p>
        <Button
          children="Start new game"
          colorButton="dark"
          onClick={() => {
            console.log('create');
          }}
        />
      </div>
      <p className={classes.header}>OR:</p>
      <div className={classes.connect}>
        <Input
          layout={InputLayoutTypes.column}
          type={'text'}
          label={'Connect to lobby by URL:'}
          value={''}
          touched={false}
          validate={true}
          shouldValidate={true}
          onChangeInputHandler={() => {
            console.log('input');
          }}
        />
        <Button
          children="Connect"
          colorButton="dark"
          onClick={() => {
            console.log('connect');
          }}
        />
      </div>
    </div>
  );
};

export { MainPage };

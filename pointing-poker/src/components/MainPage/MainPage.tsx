import React from 'react';
import classes from './MainPage.module.scss';
import { Button, Input, BackDrop } from '../index';
import { InputLayoutTypes } from '../../interfaces/InputLayoutTypes';

const MainPage: React.FC = (): JSX.Element => {
  return (
    <div className={classes.wrapper}>
      <BackDrop isBackDropOpen={true} titleModal={'Connect to lobby'} children={'test'} />
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

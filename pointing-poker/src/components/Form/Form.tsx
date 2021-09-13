import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../store/slices/userSlice';
import classes from './Form.module.scss';
import { Input } from '../index';
import { InputLayoutTypes } from '../../interfaces/InputLayoutTypes';
import { RootState } from '../../store/store';

const Form: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user);
  const onFormSubmit = () => {
    console.log('form submit');
  };
  return (
    <div className={classes.wrapper}>
      <form className={classes.form} onSubmit={onFormSubmit}>
        {Object.keys(currentUser.user).map((item, index) => {
          return item === 'image' ? (
            <Input
              key={item}
              layout={InputLayoutTypes.column}
              type={'file'}
              label={item}
              value={''}
              touched={false}
              validate={false}
              shouldValidate={false}
              onChangeInputHandler={() => {
                console.log(item);
              }}
            />
          ) : (
            <Input
              key={item}
              layout={InputLayoutTypes.column}
              type={'text'}
              label={item}
              value={''}
              touched={false}
              validate={false}
              shouldValidate={false}
              onChangeInputHandler={() => {
                console.log(item);
              }}
            />
          );
        })}
      </form>
    </div>
  );
};

export { Form };

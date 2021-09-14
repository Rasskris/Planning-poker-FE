import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../store/slices/userSlice';
import classes from './Form.module.scss';
import { Input, Button, Switcher } from '../index';
import { InputLayoutTypes } from '../../interfaces/InputLayoutTypes';
import { RootState } from '../../store/store';
import { UserRole } from '../../interfaces/UserRole';

interface IUserField {
  text: string;
  type: string;
}

const USER_INIT: { firstName: IUserField; lastName: IUserField; jobPosition: IUserField; image: IUserField } = {
  firstName: {
    text: 'First name:',
    type: 'text',
  },
  lastName: {
    text: 'Last name:',
    type: 'text',
  },
  jobPosition: {
    text: 'Job position:',
    type: 'text',
  },
  image: {
    text: '',
    type: 'file',
  },
};

interface IFormProps {
  onModalCloseHandler: () => void;
}

const Form: React.FC<IFormProps> = ({ onModalCloseHandler }): JSX.Element => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobPosition, setJobPosition] = useState('');

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = {
      firstName,
      lastName,
      jobPosition,
      isLogin: true,
      image: '',
      observer: false,
      role: UserRole.player,
    };
    dispatch(addUser(user));
  };
  const handleFormChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const rgx = /[a-zA-Z]/g;
    const match = target.id.match(rgx);
    const id = match ? match.join('').toLowerCase() : null;

    switch (id) {
      case 'firstname':
        setFirstName(value);
        break;

      case 'lastname':
        setLastName(value);
        break;

      case 'jobposition':
        setJobPosition(value);
        break;

      default:
        break;
    }
  };

  const handleSwitcher = () => {
    console.log('switcher');
  };

  return (
    <div className={classes.wrapper}>
      <Switcher switchState={false} name="formSwitcher" children={'Connect as Observer'} onClick={handleSwitcher} />,
      <form className={classes.form} onSubmit={onFormSubmit}>
        <Input
          layout={InputLayoutTypes.column}
          type={USER_INIT.firstName.type}
          label={USER_INIT.firstName.text}
          value={firstName}
          onChangeInputHandler={handleFormChange}
        />
        <Input
          layout={InputLayoutTypes.column}
          type={USER_INIT.lastName.type}
          label={USER_INIT.lastName.text}
          value={lastName}
          onChangeInputHandler={handleFormChange}
        />
        <Input
          layout={InputLayoutTypes.column}
          type={USER_INIT.jobPosition.type}
          label={USER_INIT.jobPosition.text}
          value={jobPosition}
          onChangeInputHandler={handleFormChange}
        />
        <Input
          layout={InputLayoutTypes.column}
          type={USER_INIT.image.type}
          label={USER_INIT.image.text}
          value={''}
          onChangeInputHandler={handleFormChange}
        />
        <button type="submit">Confirm</button>
        <Button disabled={false} children={'Cancel'} colorButton="light" onClick={onModalCloseHandler} />
      </form>
    </div>
  );
};

export { Form };

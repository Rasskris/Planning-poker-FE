import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addObserver, addUser, isLogin } from '../../store/slices/userSlice';
import classes from './Form.module.scss';
import { Input, Button, Switcher } from '../index';
import { InputLayoutTypes } from '../../interfaces/InputLayoutTypes';
import { RootState } from '../../store/store';

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
const BUTTON_SUBMIT_TYPE = {
  type: 'submit',
};

interface IFormProps {
  onModalCloseHandler: () => void;
}

const Form: React.FC<IFormProps> = ({ onModalCloseHandler }): JSX.Element => {
  const dispatch = useDispatch();
  const currentState = useSelector((state: RootState) => state.user);

  const [firstName, setFirstName] = useState('');
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [firstNameTouched, setFirstNameTouched] = useState(false);

  const [lastName, setLastName] = useState('');
  const [lastNameValid, setLastNameValid] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);

  const [jobPosition, setJobPosition] = useState('');
  const [jobPositionValid, setJobPositionValid] = useState(false);
  const [jobPositionTouched, setJobPositionTouched] = useState(false);

  const isValid = (id: string, value: string) => {
    if (id === 'firstname') {
      if (value.length > 2) {
        setFirstNameValid(true);
      } else {
        setFirstNameValid(false);
      }
    }

    if (id === 'lastname') {
      if (value.length > 2) {
        setLastNameValid(true);
      } else {
        setLastNameValid(false);
      }
    }

    if (id === 'jobposition') {
      if (value.length > 2) {
        setJobPositionValid(true);
      } else {
        setJobPositionValid(false);
      }
    }
  };

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = {
      firstName,
      lastName,
      jobPosition,
      observer: currentState.user.observer,
      role: currentState.user.role,
      image: '',
    };

    if (firstNameValid && lastNameValid && jobPositionValid) {
      dispatch(addUser(user));
      dispatch(isLogin(true));
      onModalCloseHandler();
    }
  };

  const handleFormChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const rgx = /[a-zA-Z]/g;
    const match = target.id.match(rgx);
    const id = match ? match.join('').toLowerCase() : null;

    switch (id) {
      case 'firstname':
        setFirstNameTouched(true);
        setFirstName(value);
        isValid(id, value);
        break;

      case 'lastname':
        setLastNameTouched(true);
        setLastName(value);
        isValid(id, value);
        break;

      case 'jobposition':
        setJobPositionTouched(true);
        setJobPosition(value);
        isValid(id, value);
        break;

      default:
        break;
    }
  };

  const handleSwitcher = () => {
    dispatch(addObserver(!currentState.user.observer));
  };

  return (
    <div className={classes.wrapper}>
      <Switcher
        switchState={currentState.user.observer}
        name="formSwitcher"
        children={'Connect as Observer'}
        onClick={handleSwitcher}
      />
      <form className={classes.form} onSubmit={onFormSubmit}>
        <Input
          layout={InputLayoutTypes.column}
          type={USER_INIT.firstName.type}
          label={USER_INIT.firstName.text}
          value={firstName}
          validate={firstNameValid}
          touched={firstNameTouched}
          onChangeInputHandler={handleFormChange}
        />
        <Input
          layout={InputLayoutTypes.column}
          type={USER_INIT.lastName.type}
          label={USER_INIT.lastName.text}
          value={lastName}
          validate={lastNameValid}
          touched={lastNameTouched}
          onChangeInputHandler={handleFormChange}
        />
        <Input
          layout={InputLayoutTypes.column}
          type={USER_INIT.jobPosition.type}
          label={USER_INIT.jobPosition.text}
          value={jobPosition}
          validate={jobPositionValid}
          touched={jobPositionTouched}
          onChangeInputHandler={handleFormChange}
        />
        <Input
          layout={InputLayoutTypes.column}
          type={USER_INIT.image.type}
          label={USER_INIT.image.text}
          value={''}
          onChangeInputHandler={handleFormChange}
        />
        <div className={classes.buttons}>
          <Button disabled={false} children={'Confirm'} colorButton="dark" {...BUTTON_SUBMIT_TYPE} />
          <Button disabled={false} children={'Cancel'} colorButton="light" onClick={onModalCloseHandler} />
        </div>
      </form>
    </div>
  );
};

export { Form };

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRole, isLogin } from '../../store/slices/userSlice';
import classes from './Form.module.scss';
import { Button, ImageLoader, Input, Switcher } from '../index';
import { InputLayoutTypes } from '../../interfaces/InputLayoutTypes';
import { UserRole } from '../../interfaces/UserRole';

interface IUserField {
  text: string;
  type: string;
}
const USER_INIT: { firstName: IUserField; lastName: IUserField; jobPosition: IUserField } = {
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
};
const BUTTON_SUBMIT_TYPE = {
  type: 'submit',
};

interface IFormProps {
  onModalCloseHandler: () => void;
  role: UserRole;
}

const Form: React.FC<IFormProps> = ({ onModalCloseHandler, role }): JSX.Element => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastName, setLastName] = useState('');
  const [jobPosition, setJobPosition] = useState('');
  const [userRole, setUserRole] = useState(role);
  const [isObserver, setIsObserver] = useState(false);
  const [imageLink, setImageLink] = useState('');

  const isValid = (id: string, value: string) => {
    if (id === 'firstname' && value.length > 1) {
      setFirstNameValid(true);
    } else {
      setFirstNameValid(false);
    }
  };

  const onImageLoadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    setImageLink(URL.createObjectURL(file));
  };

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = {
      firstName,
      lastName,
      jobPosition,
      role: userRole,
      image: imageLink,
    };

    if (firstNameValid) {
      //TODO: implement function, which will add to store user data after server request response
      // dispatch(addUser(user));
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
    setIsObserver(!isObserver);
    if (isObserver) {
      setUserRole(UserRole.observer);
    } else {
      setUserRole(role);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Switcher
        switchState={isObserver}
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
          messageError={'Enter your name. Min length: 2 symbols'}
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
        <ImageLoader onLoadImage={onImageLoadHandler} imgLink={imageLink} />
        <div className={classes.buttons}>
          <Button disabled={false} children={'Confirm'} colorButton="dark" {...BUTTON_SUBMIT_TYPE} />
          <Button disabled={false} children={'Cancel'} colorButton="light" onClick={onModalCloseHandler} />
        </div>
      </form>
    </div>
  );
};

export { Form };

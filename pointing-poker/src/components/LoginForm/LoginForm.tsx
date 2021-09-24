import { FC, ChangeEvent, FormEvent, useState } from 'react';
import { Button, ImageLoader, Input, Switcher } from '..';
import { addUser } from '../../redux/thunks';
import { InputLayoutTypes } from '../../interfaces/InputLayoutTypes';
import { USER_ROLES } from '../../constants';
import { useAppDispatch } from '../../hooks';
import classes from './LoginForm.module.scss';

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
enum userNameFieldId {
  firstName = 'firstname',
  lastName = 'lastname',
  jobPosition = 'jobposition',
}
const REGEX = /[a-zA-Z]/g;

interface IFormProps {
  gameId?: string;
  onModalCloseHandler: () => void;
  role: USER_ROLES;
}

const LoginForm: FC<IFormProps> = ({ gameId, onModalCloseHandler, role }) => {
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState('');
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastName, setLastName] = useState('');
  const [jobPosition, setJobPosition] = useState('');
  const [userRole, setUserRole] = useState(role);
  const [isObserver, setIsObserver] = useState(false);
  const [imageLink, setImageLink] = useState('');
  const isDealer = role === USER_ROLES.DEALER;

  const isValid = (id: string, value: string) => {
    const isFirstNameValid = id === userNameFieldId.firstName && value.length > 1;
    setFirstNameValid(isFirstNameValid);
  };

  const onImageLoadHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
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
      gameId,
    };

    if (firstNameValid) {
      dispatch(addUser(user));
      onModalCloseHandler();
    }
  };

  const handleFormChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    const match = target.id.match(REGEX);
    const id = match ? match.join('').toLowerCase() : null;

    switch (id) {
      case userNameFieldId.firstName:
        setFirstNameTouched(true);
        setFirstName(value);
        isValid(id, value);
        break;

      case userNameFieldId.lastName:
        setLastName(value);
        break;

      case userNameFieldId.jobPosition:
        setJobPosition(value);
        break;

      default:
        break;
    }
  };

  const handleSwitcher = () => {
    setIsObserver(prevState => !prevState);
    setUserRole(isObserver ? USER_ROLES.OBSERVER : role);
  };

  return (
    <div className={classes.wrapper}>
      {!isDealer && (
        <Switcher
          switchState={isObserver}
          name="formSwitcher"
          labelText="Connect as Observer"
          onChange={handleSwitcher}
        />
      )}
      <form className={classes.form} onSubmit={onFormSubmit}>
        <Input
          layout={InputLayoutTypes.column}
          type={USER_INIT.firstName.type}
          label={USER_INIT.firstName.text}
          value={firstName}
          validate={firstNameValid}
          touched={firstNameTouched}
          messageError="Enter your name. Min length: 2 symbols"
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
          <Button text="Confirm" colorButton="dark" type="submit" />
          <Button text="Cancel" colorButton="light" type="button" onClick={onModalCloseHandler} />
        </div>
      </form>
    </div>
  );
};

export { LoginForm };

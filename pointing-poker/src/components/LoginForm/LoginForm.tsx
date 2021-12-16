import { FC, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { LOGIN_FORM_INPUTS, USER_ROLES } from '../../enums';
import { addUser } from '../../redux/thunks';
import { selectUserLoadingStatus } from '../../redux/selectors';
import { Switcher, Button, Spinner } from '..';
import { TextField } from './TextField';
import classes from './LoginForm.module.scss';

interface FormInputs {
  firstName: string;
  lastName: string;
  jobPosition: string;
}

interface FormProps {
  gameId?: string;
  role: USER_ROLES;
  onModalCloseHandler: VoidFunction;
}

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .min(3, 'First name must be at least 3 characters')
    .max(8, 'First name must not exceed 8 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(3, 'Last name must be at least 3 characters')
    .max(8, 'Last name must not exceed 8 characters'),
  jobPosition: yup
    .string()
    .required('Job position is required')
    .min(4, 'Job position must be at least 4 characters')
    .max(10, 'Job position must not exceed 10 characters'),
});

const LoginForm: FC<FormProps> = ({ gameId, onModalCloseHandler, role }) => {
  const isDealer = role === USER_ROLES.DEALER;
  const [isObserver, setIsObserver] = useState(false);
  const isLoading = useAppSelector(selectUserLoadingStatus);
  const dispatch = useAppDispatch();
  const methods = useForm<FormInputs>({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit = (userData: FormInputs) => {
    const user = {
      ...userData,
      role: isObserver ? USER_ROLES.OBSERVER : role,
      gameId,
    };
    console.log('user', user);
    dispatch(addUser(user));
  };

  const handleSwitcher = () => {
    setIsObserver(prevState => !prevState);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className={classes.wrapper}>
      {!isDealer && (
        <Switcher
          switchState={isObserver}
          name="formSwitcher"
          labelText="Connect as Observer"
          onChange={handleSwitcher}
        />
      )}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField fieldName={LOGIN_FORM_INPUTS.FIRST_NAME} labelName="First name" />
          <TextField fieldName={LOGIN_FORM_INPUTS.LAST_NAME} labelName="Last name" />
          <TextField fieldName={LOGIN_FORM_INPUTS.JOB_POSITION} labelName="Job position" />

          <div className={classes.buttons}>
            <Button text="Confirm" colorButton="dark" type="submit" />
            <Button text="Cancel" colorButton="light" type="button" onClick={onModalCloseHandler} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export { LoginForm };

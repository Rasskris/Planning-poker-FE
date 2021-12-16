/* eslint-disable prettier/prettier */
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { LOGIN_FORM_INPUTS } from '../../../enums';
import classes from './TextField.module.scss';

interface TextFieldProps {
  fieldName: LOGIN_FORM_INPUTS;
  labelName: string;
}

const TextField: FC<TextFieldProps> = ({ fieldName, labelName }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className={classes.wrapper}>
      <label className={classes.label}>{labelName}</label>
      <input className={classes.input} { ...register(fieldName)} />
      {errors[fieldName] && <p className={classes.error}>{errors[fieldName].message}</p>}
    </div>
  )
};

export { TextField };

import React from 'react';
import classes from './Input.module.scss';

interface IPropsInput {
  type: string;
  label: string;
  value: string;
  touched: boolean;
  validate: boolean;
  shouldValidate: boolean;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  checked?: boolean;
}

const Input: React.FC<IPropsInput> = (props: IPropsInput): JSX.Element => {
  const inputType: string = props.type || 'text';
  const htmlFor: string = `${props.type}-${Math.random()}`;
  return (
    <div className={classes.wrapper}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input className={classes.input} type={inputType} id={htmlFor} value={props.value} onChange={props.onChange} />
    </div>
  );
};

export default Input;

import React from 'react';
import classes from './Input.module.scss';
import { IClasses } from '../../interfaces/IClasses';

interface IPropsInput {
  layout: string;
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

  const incomingClasses: IClasses = { ...classes };
  const layout = props.layout === 'row' ? incomingClasses.row : incomingClasses.column;
  const cls: string[] = [layout];

  return (
    <div className={cls.join(' ')}>
      <label className={classes.label} htmlFor={htmlFor}>
        {props.label}
      </label>
      <input className={classes.input} type={inputType} id={htmlFor} value={props.value} onChange={props.onChange} />
    </div>
  );
};

export default Input;

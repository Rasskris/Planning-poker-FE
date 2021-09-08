import React, { useState } from 'react';
import classes from './Input.module.scss';
import { IClasses } from '../../interfaces/IClasses';
import _uniqueId from 'lodash/uniqueId';
import { InputLayoutTypes } from '../../interfaces/InputLayoutTypes';

interface IPropsInput {
  layout: string;
  type: string;
  label: string;
  value: string;
  touched: boolean;
  validate: boolean;
  shouldValidate: boolean;
  onInputHandler(event: React.ChangeEvent<HTMLInputElement>): void;
  checked?: boolean;
}

const Input: React.FC<IPropsInput> = (props: IPropsInput): JSX.Element => {
  const inputType: string = props.type;
  const [uniqueId] = useState(_uniqueId(props.type));
  const incomingClasses: IClasses = { ...classes };
  const layout = props.layout === InputLayoutTypes.row ? incomingClasses.row : incomingClasses.column;
  const inputClasses: string = [layout].join(' ');

  return (
    <div className={inputClasses}>
      <label className={classes.label} htmlFor={uniqueId}>
        {props.label}
      </label>
      <input
        className={classes.input}
        type={inputType}
        id={uniqueId}
        value={props.value}
        onChange={props.onInputHandler}
      />
    </div>
  );
};

export { Input };

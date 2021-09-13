import React, { useState, ChangeEventHandler } from 'react';
import classes from './Input.module.scss';
import { IClasses } from '../../interfaces/IClasses';
import _uniqueId from 'lodash/uniqueId';
import { InputLayoutTypes } from '../../interfaces/InputLayoutTypes';

interface IPropsInput {
  layout: string;
  type: string;
  label: string;
  value: string;
  touched?: boolean;
  validate?: boolean;
  shouldValidate?: boolean;
  onChangeInputHandler: ChangeEventHandler;
  checked?: boolean;
}

const Input: React.FC<IPropsInput> = ({
  type,
  layout,
  value,
  onChangeInputHandler,
  label,
}: IPropsInput): JSX.Element => {
  const inputType: string = type;
  const [uniqueId] = useState(_uniqueId(type));
  const incomingClasses: IClasses = { ...classes };
  const inputLayout: string = layout === InputLayoutTypes.row ? incomingClasses.row : incomingClasses.column;

  return (
    <div className={inputLayout}>
      <label className={classes.label} htmlFor={uniqueId}>
        {label}
      </label>
      <input className={classes.input} type={inputType} id={uniqueId} value={value} onChange={onChangeInputHandler} />
    </div>
  );
};

export { Input };

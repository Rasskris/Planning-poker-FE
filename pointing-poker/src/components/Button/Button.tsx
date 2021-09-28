import React, { FC } from 'react';
import styles from './Button.module.scss';

const DEFAULT_NAME_BUTTON = 'Default button';
const DEFAULT_COLOR_BUTTON = 'light';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  onClick?: (event: React.MouseEvent) => void;
  text: string;
  disabled?: boolean;
  colorButton: 'dark' | 'light';
  btnShape?: 'circle';
  id?: string;
  btnPosition?: 'absolute' | 'relative';
}

const Button: FC<ButtonProps> = ({ id, type, onClick, text, disabled, colorButton, btnShape, btnPosition }) => {
  const classes: Array<String> = [
    styles.button,
    styles[`button_${colorButton}`],
    styles[`button_${btnShape}`],
    styles[`button_${btnPosition}`],
  ];

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes.join(' ')} id={id}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  onClick: () => {},
  text: DEFAULT_NAME_BUTTON,
  disabled: false,
  colorButton: DEFAULT_COLOR_BUTTON,
};

export { Button };

import React, { FC } from 'react';
import styles from './Button.module.scss';

const DEFAULT_NAME_BUTTON = 'Default button';
const DEFAULT_COLOR_BUTTON = 'light';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  text: string;
  disabled?: boolean;
  colorButton: 'dark' | 'light';
}

const Button: FC<ButtonProps> = ({ type, onClick, text, disabled, colorButton }) => {
  const classes: Array<String> = [styles.button, styles[`button_${colorButton}`]];

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes.join(' ')}>
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

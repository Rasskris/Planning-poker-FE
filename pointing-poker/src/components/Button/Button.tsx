import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  onClick: Function;
  children: Node | string;
  disabled: boolean;
  colorButton: string; //dark or light
}

const Button = (props: ButtonProps) => {
  const { onClick, children, disabled, colorButton, ...attr } = props;
  const classes: Array<String> = [styles.button, styles[`button_${colorButton}`]];

  return (
    <button onClick={() => onClick()} disabled={disabled} className={classes.join(' ')} {...attr}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  onClick: () => {},
  children: 'Default button',
  disabled: false,
  colorButton: 'light',
};

export default Button;

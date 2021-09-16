import React from 'react';
import styles from './Button.module.scss';

const DEFAULT_NAME_BUTTON = 'Default button';
const DEFAULT_COLOR_BUTTON = 'light';

interface ButtonProps {
  onClick?: (event: React.MouseEvent) => void;
  children: Node | string;
  disabled: boolean;
  colorButton: 'dark' | 'light';
}

const Button = (props: ButtonProps) => {
  const { onClick, children, disabled, colorButton, ...attr } = props;
  const classes: Array<String> = [styles.button, styles[`button_${colorButton}`]];

  return (
    <button onClick={onClick} disabled={disabled} className={classes.join(' ')} {...attr}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  onClick: () => {},
  children: DEFAULT_NAME_BUTTON,
  disabled: false,
  colorButton: DEFAULT_COLOR_BUTTON,
};

export { Button };

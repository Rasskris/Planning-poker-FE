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
  shapeButton?: 'circle';
  id?: string;
  positionButton?: 'absolute' | 'relative';
}

const Button: FC<ButtonProps> = ({
  id,
  type,
  onClick,
  text,
  disabled,
  colorButton,
  shapeButton,
  positionButton,
  children,
}) => {
  const classes: Array<String> = [
    styles.button,
    styles[`button_${colorButton}`],
    styles[`button_${shapeButton}`],
    styles[`button_${positionButton}`],
  ];

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes.join(' ')} id={id}>
      {text}
      {children}
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

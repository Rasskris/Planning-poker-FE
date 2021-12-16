import React, { FC, MouseEvent } from 'react';
import styles from './Button.module.scss';

const DEFAULT_NAME_BUTTON = 'Default button';
const DEFAULT_COLOR_BUTTON = 'light';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  onClick?: (event: MouseEvent) => void;
  text: string;
  disabled?: boolean;
  tooltip?: string;
  colorButton: 'dark' | 'light';
  shapeButton?: 'circle';
  positionButton?: 'absolute' | 'relative';
}

const Button: FC<ButtonProps> = ({
  type,
  onClick,
  text,
  disabled,
  colorButton,
  shapeButton,
  positionButton,
  tooltip,
}) => {
  const classes: Array<String> = [
    styles.button,
    styles[`button_${colorButton}`],
    styles[`button_${shapeButton}`],
    styles[`button_${positionButton}`],
  ];

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes.join(' ')} data-tooltip={tooltip}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  text: DEFAULT_NAME_BUTTON,
  disabled: false,
  colorButton: DEFAULT_COLOR_BUTTON,
};

export { Button };

import React, { useState } from 'react';
import styles from './Switcher.module.scss';

interface SwitcherProps {
  name: string;
  children: Node | string;
  onClick: Function;
}

const Switcher = (props: SwitcherProps) => {
  const { onClick, children, name } = props;
  const [isIncluded, setIsIncluded] = useState(false);

  function handleChange() {
    setIsIncluded(prev => !prev);
    onClick();
  }

  return (
    <label className={styles.switcher__label} htmlFor={`switcher-${name}`}>
      {children}
      <input
        className={styles.switcher__input}
        readOnly
        checked={isIncluded}
        type="checkbox"
        name={name}
        id={`switcher-${name}`}
        onChange={handleChange}
      ></input>
    </label>
  );
};

Switcher.defaultProps = {
  name: 'default-switcher',
  children: 'label-for-default-switcher',
  onClick: () => {},
};

export default Switcher;

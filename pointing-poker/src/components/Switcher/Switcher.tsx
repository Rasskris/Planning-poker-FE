import React, { useState } from 'react';
import styles from './Switcher.module.scss';

interface SwitcherProps {
  name: string;
  children: Node | string;
}

const Switcher = (props: SwitcherProps) => {
  const { children, name } = props;
  const [isIncluded, setIsIncluded] = useState(false);

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
        onClick={() => setIsIncluded(prev => !prev)}
      ></input>
    </label>
  );
};

Switcher.defaultProps = {
  name: 'default-switcher',
  children: 'label-for-default-switcher',
};

export default Switcher;

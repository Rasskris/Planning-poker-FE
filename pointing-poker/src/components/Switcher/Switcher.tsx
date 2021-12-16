import React from 'react';
import styles from './Switcher.module.scss';

const DEFAULT_NAME_SWITCHER = 'default-switcher';
const DEFAULT_LABEL_TEXT_SWITCHER = 'label-for-default-switcher';

interface SwitcherProps {
  name: string;
  labelText: string;
  onChange: () => void;
  switchState: boolean;
}

const Switcher = (props: SwitcherProps) => {
  const { onChange, labelText, name, switchState } = props;

  return (
    <label className={styles.switcher__label}>
      {labelText}
      <input
        className={styles.switcher__input}
        readOnly
        checked={switchState}
        type="checkbox"
        name={name}
        onChange={onChange}
      ></input>
    </label>
  );
};

Switcher.defaultProps = {
  name: DEFAULT_NAME_SWITCHER,
  children: DEFAULT_LABEL_TEXT_SWITCHER,
  onChange: () => {},
};

export { Switcher };

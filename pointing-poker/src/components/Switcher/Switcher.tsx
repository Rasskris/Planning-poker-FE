import React from 'react';
import styles from './Switcher.module.scss';

const DEFAULT_NAME_SWITCHER = 'default-switcher';
const DEFAULT_LABEL_TEXT_SWITCHER = 'label-for-default-switcher';

interface SwitcherProps {
  name: string;
  children: Node | string;
  onClick: () => void;
  switchState: boolean;
}

const Switcher = (props: SwitcherProps) => {
  const { onClick, children, name, switchState } = props;
  // const [isIncluded, setIsIncluded] = useState(false);

  return (
    <label className={styles.switcher__label}>
      {children}
      <input
        className={styles.switcher__input}
        readOnly
        checked={switchState}
        type="checkbox"
        name={name}
        onChange={onClick}
      ></input>
    </label>
  );
};

Switcher.defaultProps = {
  name: DEFAULT_NAME_SWITCHER,
  children: DEFAULT_LABEL_TEXT_SWITCHER,
  onClick: () => {},
};

export { Switcher };

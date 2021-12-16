import { FC } from 'react';
import classes from './SettingRow.module.scss';

interface SettingRowProps {
  settingName?: string;
}

const SettingRow: FC<SettingRowProps> = ({ settingName, children }) => {
  return (
    <div className={classes.game_setting_row}>
      {settingName ? <p>{settingName}</p> : null}
      {children}
    </div>
  );
};

export { SettingRow };

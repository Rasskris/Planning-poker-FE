import { FC } from 'react';
import classes from './GameSetiingRow.module.scss';

interface GameSettingRowProps {
  settingName?: string;
}

const GameSettingRow: FC<GameSettingRowProps> = ({ settingName, children }) => {
  return (
    <div className={classes.game_setting_row}>
      {settingName ? <p>{settingName}</p> : null}
      {children}
    </div>
  );
};

export { GameSettingRow };

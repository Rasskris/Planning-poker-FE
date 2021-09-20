import { FC } from 'react';
import classes from './GameSetiingRow.module.scss';

interface GameSettingRowProps {
  settingName?: string;
  component: JSX.Element;
}

const GameSettingRow: FC<GameSettingRowProps> = ({ settingName, component }) => {
  return (
    <div className={classes.game_setting_row}>
      {settingName ? <p>{settingName}</p> : null}
      {component}
    </div>
  );
};

export { GameSettingRow };

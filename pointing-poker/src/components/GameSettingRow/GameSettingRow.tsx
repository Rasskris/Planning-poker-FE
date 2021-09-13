import React from 'react';
import classes from './GameSetiingRow.module.scss';

interface GameSettingRowProps {
  settingName?: string;
  component: JSX.Element;
}

const GameSettingRow = (props: GameSettingRowProps) => {
  const { settingName, component } = props;

  return (
    <div className={classes.game_setting_row}>
      {settingName ? <p>{settingName}</p> : null}
      {component}
    </div>
  );
};

export { GameSettingRow };

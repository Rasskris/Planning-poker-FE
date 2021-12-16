import { ChangeEvent, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { SCORE_TYPE } from '../../enums';
import { SCORE_VALUES_PT, SCORE_VALUES_FN, SCORE_TYPE_SHORT_FN, SCORE_TYPE_SHORT_PT } from '../../constants';
import { updateSettings } from '../../redux/thunks';
import { SettingRow } from './SettingRow';
import { GameCardsList, Switcher } from '..';
import classes from './Settings.module.scss';

const GameSettings: FC = () => {
  const { scramMasterAsPlayer, scoreType, automaticAdmitAfterStartGame, timerValues } = useAppSelector(
    state => state.settings,
  );
  const { minutes, seconds } = timerValues;
  const dispatch = useAppDispatch();

  const handleChangeScoreType = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    const { value } = target;
    let scoreValues;
    let scoreTypeShort;

    if (value === SCORE_TYPE.fibonacciNumbers) {
      scoreValues = SCORE_VALUES_FN;
      scoreTypeShort = SCORE_TYPE_SHORT_FN;
    } else {
      scoreValues = SCORE_VALUES_PT;
      scoreTypeShort = SCORE_TYPE_SHORT_PT;
    }

    dispatch({
      type: updateSettings.fulfilled.type,
      payload: { scoreType: value, scoreValues, scoreTypeShort },
    });
  };

  const handleChangeTimer = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    const newTimerValue = { [name]: Number(value) };

    dispatch({
      type: updateSettings.fulfilled.type,
      payload: { timerValues: { ...timerValues, ...newTimerValue } },
    });
  };

  const handleScramMasterAsPlayer = () => {
    dispatch({
      type: updateSettings.fulfilled.type,
      payload: { scramMasterAsPlayer: !scramMasterAsPlayer },
    });
  };

  const handlerAutomaticAdmitAfterStartGame = () => {
    dispatch({
      type: updateSettings.fulfilled.type,
      payload: { automaticAdmitAfterStartGame: !automaticAdmitAfterStartGame },
    });
  };

  return (
    <section className={classes.settings}>
      <h2 className={classes.settings_title}>Game Settings</h2>
      <SettingRow>
        <Switcher
          switchState={scramMasterAsPlayer}
          onChange={handleScramMasterAsPlayer}
          labelText="Scram master as player"
        />
      </SettingRow>

      <SettingRow>
        <Switcher
          switchState={automaticAdmitAfterStartGame}
          onChange={handlerAutomaticAdmitAfterStartGame}
          labelText="Automatic admit user after start game"
        />
      </SettingRow>

      <SettingRow settingName="Timer settings">
        <div>
          <input type="number" name="minutes" min="0" max="10" value={minutes} onChange={handleChangeTimer} />
          <input type="number" name="seconds" min="0" max="59" value={seconds} onChange={handleChangeTimer} />
        </div>
      </SettingRow>

      <SettingRow settingName="Score type">
        <select value={scoreType} onChange={handleChangeScoreType}>
          <option value={SCORE_TYPE.fibonacciNumbers}>Fibonacci numbers</option>
          <option value={SCORE_TYPE.powersOfTwo}>Powers of two</option>
        </select>
      </SettingRow>

      <SettingRow settingName="Card values">
        <GameCardsList />
      </SettingRow>
    </section>
  );
};

export { GameSettings };

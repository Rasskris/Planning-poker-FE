import { ChangeEvent, FC } from 'react';
import { GameCardsList, GameSettingRow, Switcher } from '..';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ITypesScoreCards } from '../../interfaces/ITypesScoreCards';
import { SCORE_VALUES_PT, SCORE_VALUES_FN, SCORE_TYPE_SHORT_FN, SCORE_TYPE_SHORT_PT } from '../../constants';
import { updateGameSettings } from '../../redux/thunks';
import classes from './GameSettings.module.scss';

const GameSettings: FC = () => {
  const { scramMasterAsPlayerSetting, scoreTypeSetting, automaticAdmitAfterStartGame, timerValuesSetting } =
    useAppSelector(state => state.gameSettings);
  const { minutes, seconds } = timerValuesSetting;
  const dispatch = useAppDispatch();

  const handleChangeScoreType = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    let scoreValues;
    let scoreTypeShortSetting;

    if (value === ITypesScoreCards.fibonacciNumbers) {
      scoreValues = SCORE_VALUES_FN;
      scoreTypeShortSetting = SCORE_TYPE_SHORT_FN;
    } else {
      scoreValues = SCORE_VALUES_PT;
      scoreTypeShortSetting = SCORE_TYPE_SHORT_PT;
    }

    dispatch({
      type: updateGameSettings.fulfilled.type,
      payload: { scoreTypeSetting: value, scoreValues, scoreTypeShortSetting },
    });
  };

  const handleChangeTimer = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    const newTimerValue = { [name]: Number(value) };

    dispatch({
      type: updateGameSettings.fulfilled.type,
      payload: { timerValuesSetting: { ...timerValuesSetting, ...newTimerValue } },
    });
  };

  const handleScramMasterAsPlayerSetting = () => {
    dispatch({
      type: updateGameSettings.fulfilled.type,
      payload: { scramMasterAsPlayerSetting: !scramMasterAsPlayerSetting },
    });
  };

  const handlerAutomaticAdmitAfterStartGame = () => {
    dispatch({
      type: updateGameSettings.fulfilled.type,
      payload: { automaticAdmitAfterStartGame: !automaticAdmitAfterStartGame },
    });
  };

  return (
    <section className={classes.game_settings}>
      <h2 className={classes.game_settings_title}>Game Settings</h2>
      <GameSettingRow>
        <Switcher
          switchState={scramMasterAsPlayerSetting}
          onChange={handleScramMasterAsPlayerSetting}
          labelText="Scram master as player"
        />
      </GameSettingRow>

      <GameSettingRow>
        <Switcher
          switchState={automaticAdmitAfterStartGame}
          onChange={handlerAutomaticAdmitAfterStartGame}
          labelText="Automatic admit user after start game"
        />
      </GameSettingRow>

      <GameSettingRow settingName="Timer settings">
        <div>
          <input type="number" name="minutes" min="0" max="10" value={minutes} onChange={handleChangeTimer} />
          <input type="number" name="seconds" min="0" max="59" value={seconds} onChange={handleChangeTimer} />
        </div>
      </GameSettingRow>

      <GameSettingRow settingName="Score type">
        <select value={scoreTypeSetting} onChange={handleChangeScoreType}>
          <option value={ITypesScoreCards.fibonacciNumbers}>Fibonacci numbers</option>
          <option value={ITypesScoreCards.powersOfTwo}>Powers of two</option>
        </select>
      </GameSettingRow>

      <GameSettingRow settingName="Card values">
        <GameCardsList />
      </GameSettingRow>
    </section>
  );
};

export { GameSettings };

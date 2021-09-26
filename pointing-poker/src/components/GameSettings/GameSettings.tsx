import { ChangeEvent, FC } from 'react';
import { Button, GameCardsList, GameSettingRow, Switcher, TimerContainer } from '..';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateSettings } from '../../redux/slices/gameSettingsSlice';
import { ITypesScoreCards } from '../../interfaces/ITypesScoreCards';
import { SCORE_VALUES_PT, SCORE_VALUES_FN, SCORE_TYPE_SHORT_FN, SCORE_TYPE_SHORT_PT } from '../../constants';
import classes from './GameSettings.module.scss';

interface GameSettingsProps {
  handlerSaveSettingsButton?: () => void; //DELETE ?
}

const GameSettings: FC<GameSettingsProps> = ({ handlerSaveSettingsButton }) => {
  const dispatch = useAppDispatch();
  const {
    scramMasterAsPlayerSetting,
    changingCardInRoundEndSetting,
    isTimerNeededSetting,
    changeSelectionAfterFlippingCardsSetting,
    automaticFlipCardsSetting,
    scoreTypeSetting,
    timerValuesSetting,
  } = useAppSelector(state => state.gameSettings);

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

    dispatch(updateSettings({ scoreTypeSetting: value, scoreValues, scoreTypeShortSetting }));
  };
  const handlerChangeTimer = (time: { minutes: number; seconds: number }) => {
    dispatch(updateSettings({ timerValuesSetting: time }));
  };
  const handlerScramMasterAsPlayerSetting = () => {
    dispatch(updateSettings({ scramMasterAsPlayerSetting: !scramMasterAsPlayerSetting }));
  };
  const handlerChangingCardInRoundEndSetting = () => {
    dispatch(updateSettings({ changingCardInRoundEndSetting: !changingCardInRoundEndSetting }));
  };
  const handlerIsTimerNeededSetting = () => {
    dispatch(updateSettings({ isTimerNeededSetting: !isTimerNeededSetting }));
  };
  const handlerChangeSelectionAfterFlippingCardsSetting = () => {
    dispatch(updateSettings({ changeSelectionAfterFlippingCardsSetting: !changeSelectionAfterFlippingCardsSetting }));
  };
  const handlerAutomaticFlipCardsSetting = () => {
    dispatch(updateSettings({ automaticFlipCardsSetting: !automaticFlipCardsSetting }));
  };

  return (
    <section className={classes.game_settings}>
      <h2 className={classes.game_settings_title}>Game Settings</h2>
      <Button type="button" text="Save Settings" colorButton="dark" onClick={handlerSaveSettingsButton} />
      <GameSettingRow>
        <Switcher
          switchState={scramMasterAsPlayerSetting}
          onChange={handlerScramMasterAsPlayerSetting}
          labelText="Scram master as player"
        />
      </GameSettingRow>
      <GameSettingRow>
        <Switcher
          switchState={changingCardInRoundEndSetting}
          onChange={handlerChangingCardInRoundEndSetting}
          labelText="Changing card in round end"
        />
      </GameSettingRow>
      <GameSettingRow>
        <Switcher
          switchState={isTimerNeededSetting}
          onChange={handlerIsTimerNeededSetting}
          labelText="Is timer needed"
        />
      </GameSettingRow>

      {isTimerNeededSetting && (
        <GameSettingRow settingName="Round Time">
          <TimerContainer
            initialMinute={timerValuesSetting.minutes}
            initialSeconds={timerValuesSetting.seconds}
            areSettingsEdited
            onChangeTimer={handlerChangeTimer}
          />
        </GameSettingRow>
      )}

      <GameSettingRow>
        <Switcher
          switchState={changeSelectionAfterFlippingCardsSetting}
          onChange={handlerChangeSelectionAfterFlippingCardsSetting}
          labelText="Сhange selection after flipping cards"
        />
      </GameSettingRow>
      <GameSettingRow>
        <Switcher
          switchState={automaticFlipCardsSetting}
          onChange={handlerAutomaticFlipCardsSetting}
          labelText="Automatic flip of cards if everyone voted"
        />
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

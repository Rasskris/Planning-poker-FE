import React, { ChangeEvent, FC } from 'react';
import { Button, GameCardsList, GameSettingRow, Switcher, TimerContainer } from '..';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateSettings } from '../../redux/slices/gameSettingsSlice';
import { ITypesScoreCards } from '../../interfaces/ITypesScoreCards';
import { ICollectionGameCards } from '../../interfaces/ICollectionGameCards';
import classes from './GameSettings.module.scss';
const collectionGameCards: ICollectionGameCards[] = require('../../data/game-cards-data.json');

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
    dispatch(updateSettings({ scoreTypeSetting: value }));
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
      <Button
        btnPosition="absolute"
        type="button"
        text="Save Settings"
        colorButton="dark"
        onClick={handlerSaveSettingsButton}
      />
      <GameSettingRow
        component={
          <Switcher
            switchState={scramMasterAsPlayerSetting}
            onChange={handlerScramMasterAsPlayerSetting}
            labelText="Scram master as player"
          />
        }
      />
      <GameSettingRow
        component={
          <Switcher
            switchState={changingCardInRoundEndSetting}
            onChange={handlerChangingCardInRoundEndSetting}
            labelText="Changing card in round end"
          />
        }
      />
      <GameSettingRow
        component={
          <Switcher
            switchState={isTimerNeededSetting}
            onChange={handlerIsTimerNeededSetting}
            labelText="Is timer needed"
          />
        }
      />

      {isTimerNeededSetting ? (
        <GameSettingRow
          settingName="Round Time"
          component={
            <TimerContainer
              initialMinute={timerValuesSetting.minutes}
              initialSeconds={timerValuesSetting.seconds}
              areSettingsEdited
              onChangeTimer={handlerChangeTimer}
            />
          }
        />
      ) : null}

      <GameSettingRow
        component={
          <Switcher
            switchState={changeSelectionAfterFlippingCardsSetting}
            onChange={handlerChangeSelectionAfterFlippingCardsSetting}
            labelText="Сhange selection after flipping cards"
          />
        }
      />
      <GameSettingRow
        component={
          <Switcher
            switchState={automaticFlipCardsSetting}
            onChange={handlerAutomaticFlipCardsSetting}
            labelText="Automatic flip of cards if everyone voted"
          />
        }
      />
      <GameSettingRow
        settingName="Score type"
        component={
          <select value={scoreTypeSetting} onChange={handleChangeScoreType}>
            <option value={ITypesScoreCards.fibonacciNumbers}>Fibonacci numbers</option>
            <option value={ITypesScoreCards.powersOfTwo}>Powers of two</option>
            <option value={ITypesScoreCards.newScoreType}>Create new score type</option>
          </select>
        }
      />

      <GameSettingRow
        settingName="Card values"
        component={<GameCardsList scoreType={scoreTypeSetting} collectionGameCards={collectionGameCards} />}
      />
    </section>
  );
};

export { GameSettings };

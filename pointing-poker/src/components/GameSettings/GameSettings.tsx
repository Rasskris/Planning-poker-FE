import React, { ChangeEvent } from 'react';
import { GameCardsList, GameSettingRow, Input, Switcher, TimerContainer } from '..';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateSettings } from '../../store/slices/gameSettingsSlice';
import { ITypesScoreCards } from '../../interfaces/ITypesScoreCards';
import { ICollectionGameCards } from '../../interfaces/ICollectionGameCards';
import classes from './GameSettings.module.scss';
const collectionGameCards: ICollectionGameCards[] = require('../../data/game-cards-data.json');

const GameSettings = () => {
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
      <GameSettingRow
        component={
          <Switcher
            switchState={scramMasterAsPlayerSetting}
            onChange={handlerScramMasterAsPlayerSetting}
            children="Scram master as player"
          />
        }
      />
      <GameSettingRow
        component={
          <Switcher
            switchState={changingCardInRoundEndSetting}
            onChange={handlerChangingCardInRoundEndSetting}
            children="Changing card in round end"
          />
        }
      />
      <GameSettingRow
        component={
          <Switcher
            switchState={isTimerNeededSetting}
            onChange={handlerIsTimerNeededSetting}
            children="Is timer needed"
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
            children="Сhange selection after flipping cards"
          />
        }
      />
      <GameSettingRow
        component={
          <Switcher
            switchState={automaticFlipCardsSetting}
            onChange={handlerAutomaticFlipCardsSetting}
            children="Automatic flip of cards if everyone voted"
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

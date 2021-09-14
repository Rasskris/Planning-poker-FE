import React, { ChangeEvent } from 'react';
import { GameCardsList, GameSettingRow, Input, Switcher, TimerContainer } from '..';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateSettings } from '../../store/slices/gameSettingsSlice';
import { InputLayoutTypes } from '../../interfaces/InputLayoutTypes';
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
  } = useAppSelector(state => state.gameSettings.gameSettings);

  const handleChangeScoreType = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    dispatch(updateSettings({ scoreType: value }));
  };
  return (
    <section className={classes.game_settings}>
      <h2 className={classes.game_settings_title}>Game Settings</h2>
      <GameSettingRow
        component={
          <Switcher
            switchState={scramMasterAsPlayerSetting}
            onChange={() => dispatch(updateSettings({ scramMasterAsPlayerSetting: !scramMasterAsPlayerSetting }))}
            children="Scram master as player"
          />
        }
      />
      <GameSettingRow
        component={
          <Switcher
            switchState={changingCardInRoundEndSetting}
            onChange={() => dispatch(updateSettings({ changingCardInRoundEndSetting: !changingCardInRoundEndSetting }))}
            children="Changing card in round end"
          />
        }
      />
      <GameSettingRow
        component={
          <Switcher
            switchState={isTimerNeededSetting}
            onChange={() => dispatch(updateSettings({ isTimerNeededSetting: !isTimerNeededSetting }))}
            children="Is timer needed"
          />
        }
      />

      {isTimerNeededSetting ? (
        <GameSettingRow
          settingName="Round Time"
          component={
            <TimerContainer
              editSetting
              onChangeTimer={value => dispatch(updateSettings({ timerValuesSetting: value }))}
            />
          }
        />
      ) : null}

      <GameSettingRow
        component={
          <Switcher
            switchState={changeSelectionAfterFlippingCardsSetting}
            onChange={() =>
              dispatch(
                updateSettings({ changeSelectionAfterFlippingCardsSetting: !changeSelectionAfterFlippingCardsSetting }),
              )
            }
            children="Сhange selection after flipping cards"
          />
        }
      />
      <GameSettingRow
        component={
          <Switcher
            switchState={automaticFlipCardsSetting}
            onChange={() => dispatch(updateSettings({ automaticFlipCardsSetting: !automaticFlipCardsSetting }))}
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

      {scoreTypeSetting === ITypesScoreCards.newScoreType ? (
        <GameSettingRow
          component={
            <Input
              type="text"
              value="firstInput"
              label="Score type (short)"
              layout={InputLayoutTypes.row}
              onChangeInputHandler={() => {}}
            />
          }
        />
      ) : null}

      <GameSettingRow
        settingName="Card values"
        component={<GameCardsList scoreType={scoreTypeSetting} collectionGameCards={collectionGameCards} />}
      />
    </section>
  );
};

export { GameSettings };

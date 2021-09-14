import React, { ChangeEvent } from 'react';
import { GameCardsList, GameSettingRow, Input, Switcher, TimerContainer } from '..';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import classes from './GameSettings.module.scss';
import { updateSettings } from '../../store/slices/gameSettingsSlice';
import { InputLayoutTypes } from '../../interfaces/InputLayoutTypes';
import { ITypesScoreCards } from '../../interfaces/ITypesScoreCards';
import { ICollectionGameCards } from '../../interfaces/ICollectionGameCards';
const collectionGameCards: ICollectionGameCards[] = require('../../data/game-cards-data.json');

const GameSettings = () => {
  const dispatch = useAppDispatch();
  const {
    scramMasterAsPlayer,
    changingCardInRoundEnd,
    isTimerNeeded,
    changeSelectionAfterFlippingCards,
    automaticFlipCards,
    scoreType,
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
            switchState={scramMasterAsPlayer}
            onChange={() => dispatch(updateSettings({ scramMasterAsPlayer: !scramMasterAsPlayer }))}
            children="Scram master as player"
          />
        }
      />
      <GameSettingRow
        component={
          <Switcher
            switchState={changingCardInRoundEnd}
            onChange={() => dispatch(updateSettings({ changingCardInRoundEnd: !changingCardInRoundEnd }))}
            children="Changing card in round end"
          />
        }
      />
      <GameSettingRow
        component={
          <Switcher
            switchState={isTimerNeeded}
            onChange={() => dispatch(updateSettings({ isTimerNeeded: !isTimerNeeded }))}
            children="Is timer needed"
          />
        }
      />

      {isTimerNeeded ? (
        <GameSettingRow
          settingName="Round Time"
          component={
            <TimerContainer
              editSetting={true}
              onChangeTimer={value => dispatch(updateSettings({ timerValues: value }))}
            />
          }
        />
      ) : null}

      <GameSettingRow
        component={
          <Switcher
            switchState={changeSelectionAfterFlippingCards}
            onChange={() =>
              dispatch(updateSettings({ changeSelectionAfterFlippingCards: !changeSelectionAfterFlippingCards }))
            }
            children="Сhange selection after flipping cards"
          />
        }
      />
      <GameSettingRow
        component={
          <Switcher
            switchState={automaticFlipCards}
            onChange={() => dispatch(updateSettings({ automaticFlipCards: !automaticFlipCards }))}
            children="Automatic flip of cards if everyone voted"
          />
        }
      />
      <GameSettingRow
        settingName="Score type"
        component={
          <select value={scoreType} onChange={handleChangeScoreType}>
            <option value={ITypesScoreCards.fibonacciNumbers}>Fibonacci numbers</option>
            <option value={ITypesScoreCards.powersOfTwo}>Powers of two</option>
            <option value={ITypesScoreCards.newScoreType}>Create new score type</option>
          </select>
        }
      />

      {scoreType === ITypesScoreCards.newScoreType ? (
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
        component={<GameCardsList scoreType={scoreType} collectionGameCards={collectionGameCards} />}
      />
    </section>
  );
};

export { GameSettings };

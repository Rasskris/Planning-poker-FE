import { ChangeEvent, FC } from 'react';
import { GameCardsList, GameSettingRow, Switcher, TimerContainer } from '..';
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
    automaticAdmitAfterStartGame,
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
  const handleChangeTimer = (time: { minutes: number; seconds: number }) => {
    dispatch(updateSettings({ timerValuesSetting: time }));
  };
  const handleScramMasterAsPlayerSetting = () => {
    dispatch(updateSettings({ scramMasterAsPlayerSetting: !scramMasterAsPlayerSetting }));
  };
  const handleChangingCardInRoundEndSetting = () => {
    dispatch(updateSettings({ changingCardInRoundEndSetting: !changingCardInRoundEndSetting }));
  };
  const handleIsTimerNeededSetting = () => {
    dispatch(updateSettings({ isTimerNeededSetting: !isTimerNeededSetting }));
  };
  const handleChangeSelectionAfterFlippingCardsSetting = () => {
    dispatch(updateSettings({ changeSelectionAfterFlippingCardsSetting: !changeSelectionAfterFlippingCardsSetting }));
  };
  const handleAutomaticFlipCardsSetting = () => {
    dispatch(updateSettings({ automaticFlipCardsSetting: !automaticFlipCardsSetting }));
  };
  const handlerAutomaticAdmitAfterStartGame = () => {
    dispatch(updateSettings({ automaticAdmitAfterStartGame: !automaticAdmitAfterStartGame }));
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
      <GameSettingRow>
        <Switcher
          switchState={changingCardInRoundEndSetting}
          onChange={handleChangingCardInRoundEndSetting}
          labelText="Changing card in round end"
        />
      </GameSettingRow>
      <GameSettingRow>
        <Switcher
          switchState={isTimerNeededSetting}
          onChange={handleIsTimerNeededSetting}
          labelText="Is timer needed"
        />
      </GameSettingRow>

      {isTimerNeededSetting && (
        <GameSettingRow settingName="Round Time">
          <TimerContainer
            initialMinute={timerValuesSetting.minutes}
            initialSeconds={timerValuesSetting.seconds}
            areSettingsEdited
            onChangeTimer={handleChangeTimer}
          />
        </GameSettingRow>
      )}

      <GameSettingRow>
        <Switcher
          switchState={changeSelectionAfterFlippingCardsSetting}
          onChange={handleChangeSelectionAfterFlippingCardsSetting}
          labelText="Сhange selection after flipping cards"
        />
      </GameSettingRow>
      <GameSettingRow>
        <Switcher
          switchState={automaticFlipCardsSetting}
          onChange={handleAutomaticFlipCardsSetting}
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

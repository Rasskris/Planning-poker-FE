import { FC, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectSettings } from '../../../redux/selectors';
import { deleteGame, updateGameStatus, updateSettings } from '../../../redux/thunks';
import { checkIsTimerValuesNotSetted } from '../../../utils';
import { logout } from '../../../redux/actions';
import { Button } from '../..';
import classes from './LobbyDealerPanel.module.scss';

interface DealerPanelProps {
  gameId: string;
  currentUserId: string;
  setVisibleTimerNotification: (value: boolean) => void;
}

const LobbyDealerPanel: FC<DealerPanelProps> = ({ gameId, currentUserId, setVisibleTimerNotification }) => {
  const [isCopied, setIsCopied] = useState({ value: gameId, copied: false });
  const settings = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();
  const { minutes, seconds } = settings.timerValues;

  const handleStartGame = () => {
    const isTimerValuesNotSetted = checkIsTimerValuesNotSetted(minutes, seconds);

    if (isTimerValuesNotSetted) {
      setVisibleTimerNotification(true);
    } else {
      dispatch(updateGameStatus({ gameId, currentUserId, isStarted: true }));
      dispatch(updateSettings({ userId: currentUserId, settings, gameId }));
    }
  };

  const handleCancelGame = () => {
    dispatch(deleteGame(gameId));
    dispatch(logout());
  };

  const handleCopy = () => {
    setIsCopied({
      value: gameId,
      copied: true,
    });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.tooltipContainer}>
        <span className={classes.title}>Game ID:</span>
        <p className={classes.gameId}>{gameId}</p>
        <CopyToClipboard text={isCopied.value} onCopy={handleCopy}>
          <Button type="button" text="Copy" colorButton="light" />
        </CopyToClipboard>
        <span className={classes.tooltipText}>Use this id to invite others</span>
      </div>
      <div className={classes.btnWrapper}>
        <Button text="Start Game" colorButton="dark" type="button" onClick={handleStartGame} />
        <Button text="Cancel Game" colorButton="light" type="button" onClick={handleCancelGame} />
      </div>
    </div>
  );
};

export { LobbyDealerPanel };

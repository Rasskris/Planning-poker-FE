import { FC, useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import _ from 'lodash';
import {
  selectChatStatus,
  selectDealer,
  selectDoneIssues,
  selectPlayers,
  selectPlayersAndDealerIds,
  selectPlayersIds,
  selectUserById,
  selectUserOpenedVote,
  selectVoteStatus,
  selectVoteVictim,
} from '../../redux/selectors';
import {
  deleteUser,
  updateGameStatus,
  addGameRoundData,
  addVote,
  getUsers,
  updateGameRoundStatistics,
  getDataAllRoundsOfGame,
  updateIssueStatus,
} from '../../redux/thunks';
import { USER_ROLES } from '../../constants';
import { IUser } from '../../interfaces';
import {
  BackDropModal,
  Button,
  Chat,
  DealerNotification,
  GameCardsList,
  GameStatistics,
  IssueList,
  MemberNotification,
  TimerContainer,
  UserList,
  VoteNotification,
  WaitingList,
} from '../../components';
import { logout } from '../../redux/actions';
import { stopGameRound } from '../../redux/slices';
import { RoundStatistics } from '../../components/RoundStatistics';
import { roundStatiscticsCalculation } from '../../utils/roundStatisticsCalculation';
import { checkingNumberPlayersPlayed } from '../../utils/checkingNumberPlayersPlayed';
import classes from './Game.module.scss';

interface IGameProps {
  currentUser: IUser;
}

const Game: FC<IGameProps> = ({ currentUser }) => {
  const [victimData, setVictimData] = useState({ id: '', name: '' });
  const isVoteActive = useAppSelector(selectVoteStatus);
  const victim = useAppSelector(selectVoteVictim);
  const userIdOpenedVote = useAppSelector(selectUserOpenedVote);
  const userOpenedVote = useAppSelector(state => selectUserById(state, userIdOpenedVote));
  const isChatOpen = useAppSelector(selectChatStatus);
  const dealer = useAppSelector(selectDealer);
  const players = useAppSelector(selectPlayers);
  const { id: currentUserId, role: currentUserRole, gameId } = currentUser;
  const settings = useAppSelector(state => state.gameSettings);
  const { automaticFlipCardsSetting, scoreTypeShortSetting } = settings;
  const gameRoundData = useAppSelector(state => state.gameRound);
  const { playerCards, isActive, roundStatistics, currentIssue, roundIsStarted } = gameRoundData;
  const playersWhithoutDillerIds = useAppSelector(selectPlayersIds);
  const playersAndDillerIds = useAppSelector(selectPlayersAndDealerIds);
  const allPlayersIds = settings.scramMasterAsPlayerSetting ? playersAndDillerIds : playersWhithoutDillerIds;
  const isDealer = currentUserRole === USER_ROLES.DEALER;
  const readyIssues = useAppSelector(selectDoneIssues);
  const currentIssueIsDone = readyIssues.find(issue => issue.id === currentIssue);
  const isScoreVisible = !isActive;
  const dispatch = useAppDispatch();

  const [gameStatistics, setGameStatistics] = useState(false);

  useEffect(() => {
    dispatch(getUsers(gameId));
  }, [dispatch, gameId, players, dealer]);

  const handleKickUser = (id: string, name: string) => {
    if (isDealer) {
      setVictimData({ id, name });
    } else {
      dispatch(addVote({ gameId, victimId: id, currentUserId }));
    }
  };

  const handleStopGame = () => {
    dispatch(updateGameStatus({ gameId, currentUserId, isStarted: false }));
  };

  const handleExitGame = () => {
    dispatch(deleteUser({ currentUserId }));
    dispatch(logout());
  };

  const handleRestartRound = () => {
    dispatch(
      addGameRoundData({
        gameId,
        currentIssue: gameRoundData.currentIssue,
        playerCards: allPlayersIds,
        userId: currentUserId,
        scoreTypeValue: scoreTypeShortSetting,
      }),
    );
  };

  const handleStartRound = () => {
    dispatch(
      addGameRoundData({
        gameId,
        currentIssue: gameRoundData.currentIssue,
        playerCards: allPlayersIds,
        userId: currentUserId,
        scoreTypeValue: scoreTypeShortSetting,
      }),
    );
  };

  const handleGameStatisticsButton = () => {
    if (!gameStatistics) dispatch(getDataAllRoundsOfGame(gameId));
    setGameStatistics(prev => !prev);
  };

  const roundStatiscticsCalculationCallback = useCallback(
    () => roundStatiscticsCalculation({ playerCards }),
    [playerCards],
  );

  const handleStopGameRound = useCallback(() => {
    dispatch(updateIssueStatus({ id: currentIssue, gameId, creatorId: currentUserId }));
    dispatch(stopGameRound());
    if (isDealer) {
      const roundStatistics = roundStatiscticsCalculationCallback();
      dispatch(updateGameRoundStatistics({ gameId, roundStatistics, userId: currentUserId, currentIssue }));
    }
  }, [currentIssue, currentUserId, dispatch, gameId, isDealer, roundStatiscticsCalculationCallback]);

  const checkingNumberPlayersPlayedCallback = useCallback(
    () => checkingNumberPlayersPlayed({ playerCards, automaticFlipCardsSetting }),
    [automaticFlipCardsSetting, playerCards],
  );

  useEffect(() => {
    if (!isActive) return;
    checkingNumberPlayersPlayedCallback()
      .then(() => handleStopGameRound())
      .catch(() => {});
  }, [checkingNumberPlayersPlayedCallback, handleStopGameRound, isActive]);

  return (
    <section className={classes.game}>
      <div className={classes.content}>
        {isDealer && (
          <div className={classes.header}>
            <WaitingList />
            <Button text="Stop Game" colorButton="dark" type="button" onClick={handleStopGame} />
          </div>
        )}
        {!isDealer && <Button text="Exit" colorButton="dark" type="button" onClick={handleExitGame} />}
        <div className={classes.wrapper}>
          <UserList
            isScoreVisible={isScoreVisible}
            users={dealer}
            title="Dealer"
            currentUserId={currentUserId}
            handleKickUser={handleKickUser}
          />
        </div>
        <div className={classes.wrapper}>
          <UserList
            isScoreVisible={isScoreVisible}
            users={players}
            title="Players"
            currentUserId={currentUserId}
            handleKickUser={handleKickUser}
          />
        </div>
        <div className={classes.wrapper}>
          <IssueList currentUser={currentUser} />
        </div>
        <div className={classes.wrapper}>
          <GameCardsList />
          {!roundIsStarted && (
            <div className={classes.game_cardlist_plug}>
              <span>Wait for the next round</span>
            </div>
          )}
        </div>
        {settings.isTimerNeededSetting && (
          <TimerContainer
            initialMinute={settings.timerValuesSetting.minutes}
            initialSeconds={settings.timerValuesSetting.seconds}
            timerStarted={gameRoundData.roundIsStarted}
            onStopTimer={handleStopGameRound}
            roundIsActive={isActive}
          />
        )}
        {/* condition for displaying buttons */}
        {isDealer &&
          (gameRoundData.roundIsStarted || currentIssueIsDone ? (
            <div className={classes.btnWrapper}>
              <Button
                type="button"
                text="RESTART ROUND"
                colorButton="dark"
                onClick={handleRestartRound}
                disabled={gameRoundData.roundIsStarted ? true : false}
              />
            </div>
          ) : (
            <Button
              type="button"
              text="RUN ROUND"
              colorButton="dark"
              onClick={handleStartRound}
              disabled={!Boolean(currentIssue) || _.size(allPlayersIds) === 0}
            />
          ))}
        {_.size(roundStatistics) !== 0 ? <RoundStatistics /> : null}
      </div>
      {isChatOpen && (
        <div className={classes.chat}>
          <Chat currentUser={currentUser} />
        </div>
      )}
      <DealerNotification currentUserId={currentUserId} victimData={victimData} />
      {isVoteActive && victim && userOpenedVote && (
        <MemberNotification
          isVoteActive={isVoteActive}
          currentUserId={currentUserId}
          victim={victim}
          userNameOpenedVote={userOpenedVote.firstName}
        />
      )}
      <VoteNotification />
      <div onClick={handleGameStatisticsButton} className={classes.game_statistics_bar}></div>
      <div className={classes.game_round_status}>
        {roundIsStarted ? <p>Round is started</p> : <p>The round hasn't started yet</p>}
      </div>
      <BackDropModal isBackDropOpen={gameStatistics}>
        <GameStatistics onClickCanceButton={handleGameStatisticsButton} />
      </BackDropModal>
    </section>
  );
};

export { Game };

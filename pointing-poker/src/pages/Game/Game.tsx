import { FC, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import _ from 'lodash';
import {
  selectChatStatus,
  selectDealer,
  selectDoneIssues,
  selectObservers,
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
  getGameSettings,
} from '../../redux/thunks';
import { MINIMUM_NUMBER_OF_PLAYERS, USER_ROLES } from '../../constants';
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
  const observers = useAppSelector(selectObservers);
  const { id: currentUserId, role: currentUserRole, gameId } = currentUser;
  const settings = useAppSelector(state => state.gameSettings);
  const {
    automaticFlipCardsSetting,
    scoreTypeShortSetting,
    scramMasterAsPlayerSetting,
    changingCardInRoundEndSetting,
    timerValuesSetting,
  } = settings;
  const gameRoundData = useAppSelector(state => state.gameRound);
  const { playerCards, isActive, roundStatistics, currentIssue, roundIsStarted } = gameRoundData;
  const playersWhithoutDillerIds = useAppSelector(selectPlayersIds);
  const playersAndDillerIds = useAppSelector(selectPlayersAndDealerIds);
  const allPlayersIds = settings.scramMasterAsPlayerSetting ? playersAndDillerIds : playersWhithoutDillerIds;
  const isDealer = currentUserRole === USER_ROLES.DEALER;
  const readyIssues = useAppSelector(selectDoneIssues);
  const currentIssueIsDone = readyIssues.find(issue => issue.id === currentIssue);
  const isCurrentPlayerPlayedRound = playerCards.hasOwnProperty(currentUserId);
  const isScoreVisible = !isActive;
  const isDoneIssuesExist = readyIssues.length > 0;
  const dispatch = useAppDispatch();

  const [gameStatistics, setGameStatistics] = useState(false);

  useEffect(() => {
    dispatch(getUsers(gameId));
    dispatch(getGameSettings(gameId));
  }, [dispatch, gameId, players, dealer]);

  useEffect(() => {
    dispatch(getGameSettings(gameId));
  }, [dispatch, gameId]);

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
    if (isActive || changingCardInRoundEndSetting) {
      checkingNumberPlayersPlayedCallback()
        .then(() => handleStopGameRound())
        .catch(() => {});
    }
  }, [checkingNumberPlayersPlayedCallback, handleStopGameRound, isActive, changingCardInRoundEndSetting]);

  return (
    <section className={classes.game}>
      {/*TO DO: link to statistics page, to do only for Diller or available only if the game is completely finished */}
      {isDoneIssuesExist && (
        <Link className={classes.link} to="/statistics">
          Statistics
        </Link>
      )}
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
            isScoreVisible={false}
            users={dealer}
            title="Dealer"
            currentUserId={currentUserId}
            handleKickUser={handleKickUser}
          />
        </div>
        <div className={classes.wrapper}>
          <UserList
            isScoreVisible={isScoreVisible}
            isPlayer
            users={scramMasterAsPlayerSetting ? players.concat(dealer) : players}
            title="Players"
            currentUserId={currentUserId}
            handleKickUser={handleKickUser}
          />
        </div>
        <div className={classes.wrapper}>
          <UserList
            isScoreVisible={isScoreVisible}
            users={observers}
            title="Observers"
            currentUserId={currentUserId}
            handleKickUser={handleKickUser}
          />
        </div>
        <div className={classes.wrapper}>
          <div onClick={handleGameStatisticsButton} className={classes.game_statistics_bar}></div>
          <IssueList currentUser={currentUser} />
        </div>
        {/* condition for displaying the field of playing cards */}
        {((isDealer && settings.scramMasterAsPlayerSetting) || !isDealer) && (
          <div className={classes.wrapper}>
            {changingCardInRoundEndSetting && <p>You can change the card even if the round is over</p>}
            <GameCardsList />
            {((!roundIsStarted && isActive) ||
              (!changingCardInRoundEndSetting && !isActive) ||
              !isCurrentPlayerPlayedRound) && (
              <div className={classes.game_cardlist_plug}>
                <span>Wait for the next round</span>
              </div>
            )}
          </div>
        )}
        {/* timer display condition */}
        {settings.isTimerNeededSetting && (
          <TimerContainer
            initialMinute={timerValuesSetting.minutes}
            initialSeconds={timerValuesSetting.seconds}
            timerStarted={gameRoundData.roundIsStarted}
            onStopTimer={handleStopGameRound}
            isRoundActive={isActive}
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
                disabled={gameRoundData.roundIsStarted || _.size(allPlayersIds) < MINIMUM_NUMBER_OF_PLAYERS}
              />
            </div>
          ) : (
            <Button
              type="button"
              text="RUN ROUND"
              colorButton="dark"
              onClick={handleStartRound}
              disabled={!Boolean(currentIssue) || _.size(allPlayersIds) < MINIMUM_NUMBER_OF_PLAYERS}
            />
          ))}
        {/* Number of players WARNING */}
        {_.size(allPlayersIds) < MINIMUM_NUMBER_OF_PLAYERS && (
          <p>The round can be started if the number of players is at least two</p>
        )}
        {/* condition for displaying statistics */}
        {_.size(roundStatistics) !== 0 && isCurrentPlayerPlayedRound ? <RoundStatistics /> : null}
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
      {/* game round status */}
      <div className={classes.game_round_status}>
        {roundIsStarted ? (
          <p className={classes.game_round_status_active}>Active</p>
        ) : (
          <p className={classes.game_round_status_inactive}>Inactive</p>
        )}
      </div>
      {/* statistics side-bar */}
      <BackDropModal isBackDropOpen={gameStatistics}>
        <GameStatistics onClickCancel={handleGameStatisticsButton} />
      </BackDropModal>
    </section>
  );
};

export { Game };

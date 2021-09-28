import { FC, useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectChatStatus,
  selectDealer,
  selectPlayers,
  selectPlayersAndDealerIds,
  selectPlayersIds,
  selectUserById,
  selectUserOpenedVote,
  selectVoteStatus,
  selectVoteVictim,
} from '../../redux/selectors';
import { addGameRoundData, addVote, getUsers, updateGameRoundStatistics } from '../../redux/thunks';
import { USER_ROLES } from '../../constants';
import { IUser } from '../../interfaces';
import {
  Button,
  Chat,
  DealerNotification,
  GameCardsList,
  IssueList,
  MemberNotification,
  TimerContainer,
  UserList,
  VoteNotification,
} from '../../components';
import classes from './Game.module.scss';
import { stopGameRound, updateRoundStatistics } from '../../redux/slices';
import { RoundStatistics } from '../../components/RoundStatistics';
import { roundStatiscticsCalculation } from '../../utils/roundStatisticsCalculation';
import { checkingNumberPlayersPlayed } from '../../utils/checkingNumberPlayersPlayed';

interface IGameProps {
  currentUser: IUser;
}

const Game: FC<IGameProps> = ({ currentUser }) => {
  const dispatch = useAppDispatch();
  const [victimData, setVictimData] = useState({ id: '', name: '' });
  const isVoteActive = useAppSelector(selectVoteStatus);
  const victim = useAppSelector(selectVoteVictim);
  const userIdOpenedVote = useAppSelector(selectUserOpenedVote);
  const userNameOpenedVote = useAppSelector(state => selectUserById(state, userIdOpenedVote));
  const isChatOpen = useAppSelector(selectChatStatus);
  const dealer = useAppSelector(selectDealer);
  const players = useAppSelector(selectPlayers);
  const isScoreVisible = true;
  const { id: currentUserId, role: currentUserRole, gameId } = currentUser;
  const settings = useAppSelector(state => state.gameSettings);
  const { automaticFlipCardsSetting } = settings;
  const gameRoundData = useAppSelector(state => state.gameRound);
  const { playerCards, isActive } = gameRoundData;
  const playersWhithoutDillerIds = useAppSelector(selectPlayersIds);
  const playersAndDillerIds = useAppSelector(selectPlayersAndDealerIds);
  const allPlayersIds = settings.scramMasterAsPlayerSetting ? playersAndDillerIds : playersWhithoutDillerIds;

  useEffect(() => {
    dispatch(getUsers(gameId));
  }, [dispatch, gameId, players, dealer]);

  const handleKickUser = (id: string, name: string) => {
    if (currentUserRole === USER_ROLES.DEALER) {
      setVictimData({ id, name });
    } else {
      dispatch(addVote({ gameId, victimId: id, currentUserId }));
    }
  };

  const handleRestartRound = () => {
    dispatch(
      addGameRoundData({
        gameId,
        currentIssue: gameRoundData.currentIssue,
        playerCards: allPlayersIds,
        userId: currentUserId,
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
      }),
    );
  };

  const handleNextIssue = () => {
    dispatch(updateGameRoundStatistics({ gameId, gameRoundData, userId: currentUserId }));
  };

  const handleStopGameRound = useCallback(() => {
    dispatch(stopGameRound());
  }, [dispatch]);

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

  const roundStatiscticsCalculationCallback = useCallback(
    () => roundStatiscticsCalculation({ playerCards }),
    [playerCards],
  );

  useEffect(() => {
    if (isActive) return;
    const roundStatistics = roundStatiscticsCalculationCallback();
    dispatch(updateRoundStatistics(roundStatistics));
  }, [dispatch, isActive, roundStatiscticsCalculationCallback]);

  return (
    <section className={classes.game}>
      <div className={classes.content}>
        <div>
          <div className={classes.wrapper}>
            <UserList
              isScoreVisible={!isScoreVisible}
              users={dealer}
              title="Dealer"
              currentUserId={currentUserId}
              handleKickUser={handleKickUser}
            />
          </div>
          <div className={classes.wrapper}>
            <IssueList currentUser={currentUser} />
          </div>
        </div>
        <div>
          <div>
            {settings.isTimerNeededSetting && (
              <TimerContainer
                initialMinute={settings.timerValuesSetting.minutes}
                initialSeconds={settings.timerValuesSetting.seconds}
                timerStarted={gameRoundData.roundIsStarted}
                onStopTimer={handleStopGameRound}
              />
            )}
            {/* condition for displaying buttons */}
            {currentUserRole === USER_ROLES.DEALER &&
              (gameRoundData.roundIsStarted === gameRoundData.isActive ? (
                <div>
                  <Button
                    type="button"
                    text="RESTART ROUND"
                    colorButton="light"
                    onClick={handleRestartRound}
                    disabled={gameRoundData.roundIsStarted ? true : false}
                  />
                  <Button type="button" text="NEXT ISSUE" colorButton="dark" onClick={handleNextIssue} />
                </div>
              ) : (
                <Button type="button" text="RUN ROUND" colorButton="dark" onClick={handleStartRound} />
              ))}
          </div>
          <div>
            <RoundStatistics />
          </div>
        </div>
        <div>
          {isChatOpen && (
            <div className={classes.chat}>
              <Chat currentUser={currentUser} />
            </div>
          )}
          <DealerNotification currentUserId={currentUserId} victimData={victimData} />
          {isVoteActive && victim && userNameOpenedVote && (
            <MemberNotification
              isVoteActive={isVoteActive}
              currentUserId={currentUserId}
              victim={victim}
              userNameOpenedVote={userNameOpenedVote.firstName}
            />
          )}
          <div className={classes.wrapper}>
            <UserList
              isScoreVisible={isScoreVisible}
              users={players}
              title="Players"
              currentUserId={currentUserId}
              handleKickUser={handleKickUser}
            />
          </div>
        </div>
      </div>
      <div className={classes.wrapper}>
        <GameCardsList />
      </div>
      <VoteNotification />
    </section>
  );
};

export { Game };

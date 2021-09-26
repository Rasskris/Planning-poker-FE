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
import { IObjectType } from '../../interfaces/IObjectType';
import { RoundStatistics } from '../../components/RoundStatistics';

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
  const gameRoundData = useAppSelector(state => state.gameRound);
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

  const handlerRestartRound = () => {
    dispatch(
      addGameRoundData({
        gameId: gameId,
        currentIssue: gameRoundData.currentIssue,
        playerCards: allPlayersIds,
        userId: currentUserId,
      }),
    );
  };

  const handlerStartRound = () => {
    dispatch(
      addGameRoundData({
        gameId: gameId,
        currentIssue: gameRoundData.currentIssue,
        playerCards: allPlayersIds,
        userId: currentUserId,
      }),
    );
  };

  const handlerNextIssue = () => {
    dispatch(updateGameRoundStatistics({ gameId: gameId, gameRoundData, userId: currentUserId }));
  };

  const handlerStopGameRound = useCallback(() => {
    dispatch(stopGameRound());
  }, [dispatch]);

  const checkingNumberPlayersPlayed = useCallback(() => {
    let playerCards: IObjectType = gameRoundData.playerCards;
    if (!gameRoundData.isActive) return;
    if (settings.automaticFlipCardsSetting) {
      if (Object.keys(playerCards).length === 0) return;
      for (let key in playerCards) {
        if (!playerCards[key]) return;
      }
      handlerStopGameRound();
    }
  }, [gameRoundData.playerCards, gameRoundData.isActive, settings.automaticFlipCardsSetting, handlerStopGameRound]);

  useEffect(() => {
    checkingNumberPlayersPlayed();
  }, [checkingNumberPlayersPlayed]);

  const roundStatiscticsCalculation = useCallback(() => {
    if (gameRoundData.isActive) return;
    let playerCards: IObjectType = gameRoundData.playerCards;
    let roundStatisticsMap: Map<string | null, number> = new Map(); // key: score Card Value, value: number of identical cards
    let numberPlayersOfRound = 0;
    for (let key in playerCards) {
      numberPlayersOfRound += 1;
      let scoreCardValue = playerCards[key] ? playerCards[key] : 'unknown';
      let numberOfIdenticalCards = roundStatisticsMap.get(scoreCardValue);
      if (numberOfIdenticalCards) {
        roundStatisticsMap.set(scoreCardValue, numberOfIdenticalCards + 1);
      } else {
        roundStatisticsMap.set(scoreCardValue, 1);
      }
    }

    for (let key of roundStatisticsMap.keys() as any) {
      let numberOfIdenticalCards = roundStatisticsMap.get(key);
      if (numberOfIdenticalCards) {
        let percentageValue = (numberOfIdenticalCards * 100) / numberPlayersOfRound;
        roundStatisticsMap.set(key, percentageValue);
      }
    }
    let roundStatisticsObj = Object.fromEntries(roundStatisticsMap);
    dispatch(updateRoundStatistics(roundStatisticsObj));
  }, [gameRoundData.isActive, gameRoundData.playerCards, dispatch]);

  useEffect(() => {
    roundStatiscticsCalculation();
  }, [roundStatiscticsCalculation]);

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
                handlerStopTimer={handlerStopGameRound}
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
                    onClick={handlerRestartRound}
                    disabled={gameRoundData.roundIsStarted ? true : false}
                  />
                  <Button type="button" text="NEXT ISSUE" colorButton="dark" onClick={handlerNextIssue} />
                </div>
              ) : (
                <Button type="button" text="RUN ROUND" colorButton="dark" onClick={handlerStartRound} />
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

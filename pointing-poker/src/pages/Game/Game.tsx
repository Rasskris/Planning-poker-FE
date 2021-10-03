import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectChatStatus,
  selectCurrentIssue,
  selectDealer,
  selectDoneIssues,
  selectObservers,
  selectPlayers,
  selectRoundStatus,
  selectSettings,
  selectTimer,
  selectUserById,
  selectUserOpenedVote,
  selectVoteStatus,
  selectVoteVictim,
} from '../../redux/selectors';
import {
  Button,
  Chat,
  DealerNotification,
  GameCardsList,
  IssueList,
  MemberNotification,
  Timer,
  UserCard,
  UserList,
  VoteNotification,
  WaitingList,
} from '../../components';
import {
  deleteUser,
  updateGameStatus,
  addVote,
  getUsers,
  getGameSettings,
  updateRoundStatus,
  updateDoneIssue,
  getRoundStatus,
} from '../../redux/thunks';
import { ROUND_STATUS, TOOLTIP_TEXT, USER_ROLES } from '../../constants';
import { getStatistics } from '../../utils';
import { IUser } from '../../interfaces';
import { logout } from '../../redux/actions';
import classes from './Game.module.scss';
import { NavLink } from 'react-router-dom';
import { resetSelectedCards } from '../../redux/slices';

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
  const settings = useAppSelector(selectSettings);
  const currentIssue = useAppSelector(selectCurrentIssue);
  const timer = useAppSelector(selectTimer);
  const roundStatus = useAppSelector(selectRoundStatus);
  const doneIssues = useAppSelector(selectDoneIssues);

  const isScoreVisible = !!currentIssue?.isDone && !(roundStatus === ROUND_STATUS.STARTED);
  const { scoreTypeShortSetting, scramMasterAsPlayerSetting } = settings;
  const allPlayers = scramMasterAsPlayerSetting && dealer ? players.concat(dealer) : players;
  const { id: currentUserId, role: currentUserRole, gameId } = currentUser;
  const isDealer = currentUserRole === USER_ROLES.DEALER;
  const isObserver = currentUserRole === USER_ROLES.OBSERVER;
  const isRoundStarted = roundStatus === ROUND_STATUS.STARTED;
  const isVisibleGameCards = !isDealer || settings.scramMasterAsPlayerSetting;
  const isDoneIssuesExist = doneIssues.length > 0;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers(gameId));
  }, [dispatch, gameId, players, dealer]);

  useEffect(() => {
    dispatch(getGameSettings(gameId));
    dispatch(getRoundStatus(gameId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isDealer && roundStatus === ROUND_STATUS.FINISHED) {
      const statistics = getStatistics(scoreTypeShortSetting, allPlayers, allPlayers.length);

      dispatch(updateDoneIssue({ ...currentIssue, statistics, isDone: true }));
      dispatch({ type: updateRoundStatus.fulfilled.type, payload: ROUND_STATUS.NOT_STARTED });
      dispatch(
        updateRoundStatus({
          gameId,
          userId: currentUserId,
          roundStatus: ROUND_STATUS.NOT_STARTED,
        }),
      );
    }
  });

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

  const handleStartRound = () => {
    dispatch(
      updateRoundStatus({
        gameId,
        userId: currentUserId,
        roundStatus: ROUND_STATUS.STARTED,
      }),
    );
    dispatch(resetSelectedCards(scoreTypeShortSetting));
  };

  return (
    <section className={classes.game}>
      <div className={classes.container}>
        <div className={classes.wrapperRow}>
          <div className={classes.wrapperColumn}>
            {isDoneIssuesExist && (
              <NavLink className={classes.link} exact to="/statistics">
                Statistics
              </NavLink>
            )}
            {!isDealer && <Button text="Exit" colorButton="dark" type="button" onClick={handleExitGame} />}
            {isDealer && <WaitingList />}
            {isDealer && (
              <Button
                text="Stop Game"
                colorButton="dark"
                type="button"
                onClick={handleStopGame}
                disabled={isRoundStarted}
              />
            )}
            <div className={classes.wrapper}>
              <p className={classes.title}>Dealer</p>
              {dealer && (
                <UserCard
                  id={dealer.id}
                  currentUserId={currentUserId}
                  firstName={dealer.firstName}
                  lastName={dealer.lastName}
                  role={dealer.role}
                  jobPosition={dealer.jobPosition}
                  handleKickUser={handleKickUser}
                />
              )}
            </div>
            <div className={classes.wrapper}>
              <IssueList currentUser={currentUser} />
            </div>
            <div className={classes.wrapper}>
              {isDealer &&
                (currentIssue?.isDone ? (
                  <div>
                    <Button
                      type="button"
                      text="RESTART ROUND"
                      colorButton="light"
                      onClick={handleStartRound}
                      disabled={isRoundStarted}
                    />
                  </div>
                ) : (
                  <div title={currentIssue ? '' : TOOLTIP_TEXT}>
                    <Button
                      type="button"
                      text="RUN ROUND"
                      colorButton="dark"
                      onClick={handleStartRound}
                      disabled={isRoundStarted || !currentIssue}
                    />
                  </div>
                ))}
            </div>
            <div className={classes.wrapper}>
              <Timer minutes={timer.minutes} seconds={timer.seconds} />
            </div>
          </div>
          <div className={classes.wrapperColumn}>
            <div className={classes.wrapper}>
              <UserList
                isScoreVisible={isScoreVisible}
                isPlayer
                users={allPlayers}
                title="Players"
                currentUserId={currentUserId}
                handleKickUser={handleKickUser}
              />
            </div>
            <div className={classes.wrapper}>
              <UserList
                isScoreVisible={false}
                isPlayer={false}
                users={observers}
                title="Observers"
                currentUserId={currentUserId}
                handleKickUser={handleKickUser}
              />
            </div>
          </div>
        </div>
        <div className={classes.wrapperRow}>
          {!isObserver && isVisibleGameCards && (
            <div className={classes.wrapper}>
              <GameCardsList />
            </div>
          )}
        </div>
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
    </section>
  );
};

export { Game };

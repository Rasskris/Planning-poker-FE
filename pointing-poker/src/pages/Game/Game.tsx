/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector, useMemberToast, useUsers } from '../../hooks';
import { selectCurrentIssue, selectDoneIssues, selectRoundStatus, selectSettings } from '../../redux/selectors';
import { getSettings, updateDoneIssue, getRoundStatus, finishRound } from '../../redux/thunks';
import { GameCardsList, IssueList, MembersContainer, Timer, VoteNotification, GameDealerPanel } from '../../components';
import { ROUND_STATUS, USER_ROLES } from '../../enums';
import { getStatistics } from '../../utils';
import { User } from '../../interfaces';
import { NavLink } from 'react-router-dom';
import classes from './Game.module.scss';

interface GameProps {
  currentUser: User;
}

const Game: FC<GameProps> = ({ currentUser }) => {
  const { id: currentUserId, role: currentUserRole, gameId } = currentUser;
  const { dealer, players, observers } = useUsers(gameId);
  const settings = useAppSelector(selectSettings);
  const currentIssue = useAppSelector(selectCurrentIssue);
  const roundStatus = useAppSelector(selectRoundStatus);
  const doneIssues = useAppSelector(selectDoneIssues);

  const isScoreVisible = roundStatus === ROUND_STATUS.FINISHED;
  const { scoreTypeShort, scramMasterAsPlayer } = settings;
  const allPlayers = scramMasterAsPlayer ? players.concat(dealer) : players;
  const isDealer = currentUserRole === USER_ROLES.DEALER;
  const isObserver = currentUserRole === USER_ROLES.OBSERVER;
  const isVisibleGameCards = !isDealer || settings.scramMasterAsPlayer;
  const isDoneIssuesExist = doneIssues.length > 0;
  const dispatch = useAppDispatch();
  useMemberToast();

  useEffect(() => {
    dispatch(getSettings(gameId));
    dispatch(getRoundStatus(gameId));
  }, []);

  useEffect(() => {
    if (isDealer && roundStatus === ROUND_STATUS.FINISHED) {
      const statistics = getStatistics(scoreTypeShort, allPlayers, allPlayers.length);

      dispatch(updateDoneIssue({ ...currentIssue, statistics, isDone: true }));
      dispatch(finishRound(gameId));
    }
  }, [isDealer, roundStatus]);

  return (
    <section className={classes.game}>
      <div className={classes.container}>
        {isDoneIssuesExist && (
          <NavLink className={classes.link} exact to="/statistics">
            Statistics
          </NavLink>
        )}
        {isDealer && <GameDealerPanel gameId={gameId} currentUserId={currentUserId} scoreTypeShort={scoreTypeShort} />}
        <MembersContainer
          gameId={gameId}
          isScoreVisible={isScoreVisible}
          currentUser={currentUser}
          dealer={dealer}
          players={allPlayers}
          observers={observers}
        />
        <div className={classes.wrapperRow}>
          <div className={classes.wrapperGameCards}>
            <Timer />
            {!isObserver && isVisibleGameCards && <GameCardsList />}
          </div>
          <div className={classes.wrapperIssue}>
            <IssueList currentUser={currentUser} />
          </div>
        </div>
      </div>
      <VoteNotification />
    </section>
  );
};

export default Game;

import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIssues, deleteIssue, updateCurrentIssue, getGameSettings } from '../../redux/thunks';
import { selectIssues, selectSettings } from '../../redux/selectors';
import { IssueCard, IssueForm, BackDropModal } from '..';
import { USER_ROLES } from '../../constants';
import { Issue, IUser } from '../../interfaces';
import classes from './IssueList.module.scss';
import { StatisticCard } from './StatisticCard';

interface IssueListProps {
  currentUser: IUser;
}
const IssueList: FC<IssueListProps> = ({ currentUser }) => {
  const { id: userId, role, gameId } = currentUser;
  const isDealer = role === USER_ROLES.DEALER;
  const settings = useAppSelector(selectSettings);
  const [isIssueFormOpen, setIsIssueFormOpen] = useState(false);
  const issues = useAppSelector(selectIssues);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIssues(gameId));
  }, [dispatch, gameId, issues]);

  const handleClick = () => {
    setIsIssueFormOpen(prevState => !prevState);
  };

  const handleRemoveIssue = (id: string) => {
    dispatch(deleteIssue(id));
  };

  const handleSelectCurrentIssue = (issue: Partial<Issue>) => {
    dispatch(updateCurrentIssue(issue));
    dispatch({ type: getGameSettings.fulfilled.type, payload: settings });
  };

  return (
    <>
      {isIssueFormOpen && (
        <BackDropModal isBackDropOpen={isIssueFormOpen}>
          <IssueForm gameId={gameId} creatorId={userId} handleCloseModal={handleClick} />
        </BackDropModal>
      )}
      <div className={classes.issueList}>
        <p className={classes.title}>Issues:</p>
        {isDealer && (
          <div className={classes.issueCard}>
            <p>Create New Issue</p>
            <button className={classes.btnCreate} onClick={handleClick}></button>
          </div>
        )}
        {issues.map(({ id, title, priority, gameId, isCurrent, creatorId, isDone, statistics }) => (
          <div key={id} className={classes.cardWrapper}>
            <IssueCard
              id={id}
              title={title}
              priority={priority}
              gameId={gameId}
              creatorId={creatorId}
              isDealer={isDealer}
              isCurrent={isCurrent}
              isDone={isDone}
              handleSelectCurrentIssue={handleSelectCurrentIssue}
              handleRemoveIssue={handleRemoveIssue}
            />
            {isDone && statistics && <StatisticCard statistics={statistics} />}
          </div>
        ))}
      </div>
    </>
  );
};

export { IssueList };

import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIssues, deleteIssue, updateIssue } from '../../redux/thunks';
import { selectCurrentUser, selectIssues } from '../../redux/selectors';
import { IssueCard, IssueForm, BackDropModal } from '..';
import { USER_ROLES } from '../../constants';
import { Issue, IUser } from '../../interfaces';
import classes from './IssueList.module.scss';

const IssueList: FC = () => {
  const [isIssueFormOpen, setIsIssueFormOpen] = useState(false);
  const issues = useAppSelector(selectIssues);
  const { id: userId, role, gameId } = useAppSelector(selectCurrentUser) as IUser;
  const isDealer = role === USER_ROLES.DEALER;
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
    dispatch(updateIssue(issue));
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
        {issues.map(({ id, title, priority, gameId, isCurrent, creatorId }) => (
          <IssueCard
            key={id}
            id={id}
            title={title}
            priority={priority}
            gameId={gameId}
            creatorId={creatorId}
            isDealer={isDealer}
            isCurrent={isCurrent}
            handleSelectCurrentIssue={handleSelectCurrentIssue}
            handleRemoveIssue={handleRemoveIssue}
          />
        ))}
      </div>
    </>
  );
};

export { IssueList };

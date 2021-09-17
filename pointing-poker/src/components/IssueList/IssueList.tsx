import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIssues, deleteIssue } from '../../redux/thunks';
import { selectIssues, selectUser } from '../../redux/selectors';
import { IssueCard, IssueForm } from '..';
import { USER_ROLES } from '../../constants';
import classes from './IssueList.module.scss';

const IssueList: FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const issues = useAppSelector(selectIssues);
  const { id: userId, role } = useAppSelector(selectUser);
  const isDealer = role === USER_ROLES.DEALER;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIssues(gameId));
  }, [dispatch, gameId, issues]);

  const handleCreateIssue = () => {
    //there should be a wrapper for the modal window, this wrapper doing by another person
    <IssueForm gameId={gameId} creatorId={userId} />;
  };

  const handleRemoveIssue = (id: string) => {
    dispatch(deleteIssue(id));
  };

  return (
    <div className={classes.issueList}>
      {isDealer && (
        <div className={classes.issueCard}>
          <p>Create New Issue</p>
          <button className={classes.btnCreate} onClick={handleCreateIssue}></button>
        </div>
      )}
      {issues.map(({ id, title, priority }) => (
        <IssueCard
          key={id}
          id={id}
          title={title}
          priority={priority}
          isDealer={isDealer}
          handleRemoveIssue={handleRemoveIssue}
        />
      ))}
    </div>
  );
};

export { IssueList };

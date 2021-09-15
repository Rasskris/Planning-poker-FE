import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIssues, deleteIssue } from '../../redux/thunks';
import { selectIssues, selectUser } from '../../redux/selectors';
import { IssueCard, IssueForm } from '..';
import classes from './IssueList.module.scss';

const IssueList: FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const issues = useAppSelector(selectIssues);
  const { id: userId, role } = useAppSelector(selectUser);
  const isDealer = role === 'dealer';
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIssues(gameId));
  }, [dispatch, gameId, issues]);

  const handleCreateIssue = () => {
    //there should be a wrapper for the modal window, it is done by another person
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
      {issues.map(({ id, title, priority }) => {
        return (
          <IssueCard
            key={id}
            id={id}
            title={title}
            priority={priority}
            isDealer={isDealer}
            handleRemoveIssue={handleRemoveIssue}
          />
        );
      })}
    </div>
  );
};

export { IssueList };

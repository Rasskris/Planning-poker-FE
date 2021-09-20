import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIssues, deleteIssue } from '../../redux/thunks';
import { selectIssues } from '../../redux/selectors';
import { IssueCard, IssueForm } from '..';
import { USER_ROLES } from '../../constants';
import { User } from '../../interfaces';
import classes from './IssueList.module.scss';

interface IssueListProps {
  currentUser: User;
}

const IssueList: FC<IssueListProps> = ({ currentUser }) => {
  const issues = useAppSelector(selectIssues);
  const { id: userId, role, gameId } = currentUser;
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
      <p className={classes.title}>Issues:</p>
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

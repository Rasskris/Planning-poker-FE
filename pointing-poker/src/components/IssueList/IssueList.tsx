import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIssues, deleteIssue, updateIssue, resetGameRoundDataThunk, addIssue } from '../../redux/thunks';
import { selectIssues } from '../../redux/selectors';
import { IssueCard, IssueForm, BackDropModal } from '..';
import { USER_ROLES } from '../../constants';
import { Issue, IUser } from '../../interfaces';
import classes from './IssueList.module.scss';
import { deleteCurrentIssue, setCurrentIssue } from '../../redux/slices';
import { ReadIssueList } from '../../utils/readIssueListFromFile';
import React from 'react';

interface IssueListProps {
  currentUser: IUser;
}
const IssueList: FC<IssueListProps> = ({ currentUser }) => {
  const { id: userId, role, gameId } = currentUser;
  const isDealer = role === USER_ROLES.DEALER;
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
    dispatch(deleteCurrentIssue(id));
    // dispatch(deleteGameRoundData({ gameId, userId, currentIssue: id }));
  };

  const handleSelectCurrentIssue = (issue: Partial<Issue>) => {
    dispatch(updateIssue(issue));
    dispatch(setCurrentIssue(issue.id));
    dispatch(resetGameRoundDataThunk({ gameId, userId }));
  };

  const handleLoadFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    ReadIssueList.readIssueListFromFile({ event });
    setTimeout(() => {
      const newIssueList = ReadIssueList.resultReader.split('\n');
      newIssueList.forEach(issueName => {
        const issue = { gameId, creatorId: userId, ...{ title: issueName, priority: 'Low' } };
        dispatch(addIssue(issue));
      });
    }, 1000);
    event.target.value = '';
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
          <>
            <div className={classes.issueCard}>
              <p>Create New Issue</p>
              <button className={classes.btnCreate} onClick={handleClick}></button>
            </div>
            <label htmlFor="download_issue_list" className={classes.issueCard}>
              Load Issue List from file
              <input
                type="file"
                name="download_issue_list"
                id="download_issue_list"
                className={classes.download_issue_list}
                onChange={handleLoadFromFile}
              />
            </label>
          </>
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

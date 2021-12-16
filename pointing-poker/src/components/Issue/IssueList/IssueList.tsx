import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getIssues, deleteIssue, updateCurrentIssue, getSettings } from '../../../redux/thunks';
import { selectIssues, selectSettings } from '../../../redux/selectors';
import { USER_ROLES } from '../../../enums';
import { Issue, User } from '../../../interfaces';
import { DEALER_ISSUE_TEXT, MEMBER_ISSUE_TEXT } from '../../../constants';
import { BackDropModal } from '../../BackDropModal';
import { DefaultContent } from '../../DefaultContent';
import { IssueDealerCard, IssueStatisticCard, IssueForm, IssueCard } from '..';
import classes from './IssueList.module.scss';

interface IssueListProps {
  currentUser: User;
}

const IssueList: FC<IssueListProps> = ({ currentUser }) => {
  const { id: userId, role, gameId } = currentUser;
  const isDealer = role === USER_ROLES.DEALER;
  const settings = useAppSelector(selectSettings);
  const [isIssueFormOpen, setIsIssueFormOpen] = useState(false);
  const issues = useAppSelector(selectIssues);
  const isIssueListEmpty = issues.length === 0;
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
    dispatch({ type: getSettings.fulfilled.type, payload: settings });
  };

  return (
    <>
      {isIssueFormOpen && (
        <BackDropModal isBackDropOpen={isIssueFormOpen}>
          <IssueForm gameId={gameId} creatorId={userId} onCloseModal={handleClick} />
        </BackDropModal>
      )}
      <div className={classes.issueList}>
        <p className={classes.title}>Issues:</p>
        {isDealer && <IssueDealerCard onClick={handleClick} />}
        {isIssueListEmpty ? (
          <DefaultContent text={isDealer ? DEALER_ISSUE_TEXT : MEMBER_ISSUE_TEXT} />
        ) : (
          issues.map(({ id, title, priority, gameId, isCurrent, creatorId, isDone, statistics }) => (
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
              {isDone && statistics && <IssueStatisticCard statistics={statistics} />}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export { IssueList };

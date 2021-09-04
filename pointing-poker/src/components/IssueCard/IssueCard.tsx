import { FC } from 'react';
import classes from './IssueCard.module.scss';

interface IssueCardProps {
  isCurrentIssue?: boolean;
  issueName: string;
  issuePriority: 'Low' | 'Middle' | 'Hight';
  handleEditIssue?: VoidFunction;
  handleRemoveIssue?: VoidFunction;
}

const IssueCard: FC<IssueCardProps> = ({
  isCurrentIssue,
  issueName,
  issuePriority,
  handleEditIssue,
  handleRemoveIssue,
}) => {
  return (
    <div className={classes.issueCard}>
      <div className={classes.issueInfo}>
        {isCurrentIssue && (
          <p className={classes.issueCurrent} data-testid="issueCurrent">
            current
          </p>
        )}
        <p className={classes.issueName} data-testid="issueName">
          {issueName}
        </p>
        <p className={classes.issuePriority} data-testid="issuePriority">
          {issuePriority} priority
        </p>
      </div>
      <div className={classes.btnContainer}>
        {handleEditIssue && (
          <button className={classes.btnEdit} onClick={handleEditIssue} data-testid="btnEdit"></button>
        )}
        {handleRemoveIssue && (
          <button className={classes.btnRemove} onClick={handleRemoveIssue} data-testid="btnRemove"></button>
        )}
      </div>
    </div>
  );
};

export default IssueCard;

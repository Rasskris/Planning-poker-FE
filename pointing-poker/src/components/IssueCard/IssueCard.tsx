import { FC } from 'react';
import { Issue } from '../../interfaces';
import classes from './IssueCard.module.scss';

interface IProps extends Omit<Issue, 'creatorId' | 'gameId'> {
  isCurrentIssue?: boolean;
  isDealer: boolean;
  handleRemoveIssue: (id: string) => void;
}

const IssueCard: FC<IProps> = ({ id, isCurrentIssue, isDealer, title, priority, handleRemoveIssue }) => {
  const handleClick = () => {
    handleRemoveIssue(id);
  };

  return (
    <div className={classes.issueCard}>
      <div className={classes.issueInfo}>
        {isCurrentIssue && <p className={classes.issueCurrent}>current</p>}
        <p className={classes.issueName}>{title}</p>
        <p className={classes.issuePriority}>{priority} priority</p>
      </div>
      {isDealer && <button className={classes.btnRemove} onClick={handleClick} data-testid="btnRemove"></button>}
    </div>
  );
};

export { IssueCard };

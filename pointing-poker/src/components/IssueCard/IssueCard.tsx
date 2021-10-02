import { FC } from 'react';
import { ROUND_STATUS } from '../../constants';
import { useAppSelector } from '../../hooks';
import { Issue } from '../../interfaces';
import { selectGameStatus, selectRoundStatus } from '../../redux/selectors';
import classes from './IssueCard.module.scss';

interface IssueProps extends Issue {
  isDealer: boolean;
  isCurrent: boolean;
  handleRemoveIssue: (id: string) => void;
  handleSelectCurrentIssue: (issue: Partial<Issue>) => void;
}

const IssueCard: FC<IssueProps> = ({
  id,
  isCurrent,
  isDone,
  isDealer,
  title,
  priority,
  gameId,
  creatorId,
  handleRemoveIssue,
  handleSelectCurrentIssue,
}) => {
  const issueCardClasses = isCurrent ? [classes.issueCard, classes.active].join(' ') : classes.issueCard;
  const isGameStarted = useAppSelector(selectGameStatus);
  const roundStatus = useAppSelector(selectRoundStatus);
  const isRoundStarted = roundStatus === ROUND_STATUS.STARTED;
  const isCover = isGameStarted && isDealer && !isRoundStarted;

  const handleClickRemove = () => {
    handleRemoveIssue(id);
  };

  const handleClickSelect = () => {
    handleSelectCurrentIssue({ id, gameId, creatorId, isDone, isCurrent: true });
  };

  return (
    <div className={issueCardClasses}>
      <div className={classes.issueInfo}>
        {isCurrent && <p className={classes.issueCurrent}>current</p>}
        <p className={classes.issueName}>{title}</p>
        <p className={classes.issuePriority}>{priority} priority</p>
      </div>
      {isDealer && <button className={classes.btnRemove} onClick={handleClickRemove} data-testid="btnRemove"></button>}
      {isCover && <div className={classes.cover} onClick={handleClickSelect}></div>}
    </div>
  );
};

export { IssueCard };

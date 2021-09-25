import { FC } from 'react';
import { useAppSelector } from '../../hooks';
import { Issue } from '../../interfaces';
import { selectStatusGame } from '../../redux/selectors';
import classes from './IssueCard.module.scss';

interface IProps extends Issue {
  isDealer: boolean;
  handleRemoveIssue: (id: string) => void;
  handleSelectCurrentIssue: (issue: Partial<Issue>) => void;
}

const IssueCard: FC<IProps> = ({
  id,
  isCurrent,
  isDealer,
  title,
  priority,
  gameId,
  creatorId,
  handleRemoveIssue,
  handleSelectCurrentIssue,
}) => {
  const issueCardClasses = isCurrent ? [classes.issueCard, classes.active].join(' ') : classes.issueCard;
  const isStartedGame = useAppSelector(selectStatusGame);

  const handleClickRemove = () => {
    handleRemoveIssue(id);
  };

  const handleClickSelect = () => {
    handleSelectCurrentIssue({ id, gameId, creatorId });
  };

  return (
    <div className={issueCardClasses}>
      <div className={classes.issueInfo}>
        {isCurrent && <p className={classes.issueCurrent}>current</p>}
        <p className={classes.issueName}>{title}</p>
        <p className={classes.issuePriority}>{priority} priority</p>
      </div>
      {isDealer && <button className={classes.btnRemove} onClick={handleClickRemove} data-testid="btnRemove"></button>}
      {isStartedGame && isDealer ? <div className={classes.cover} onClick={handleClickSelect}></div> : null}
    </div>
  );
};

export { IssueCard };

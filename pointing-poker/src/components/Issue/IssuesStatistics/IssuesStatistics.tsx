import { forwardRef } from 'react';
import { GameCard } from '../../Game';
import { useAppSelector } from '../../../hooks';
import { selectDoneIssues } from '../../../redux/selectors';
import classes from './IssuesStatistics.module.scss';

export const IssuesStatistics = forwardRef<HTMLDivElement>((_, ref) => {
  const doneIssues = useAppSelector(selectDoneIssues);

  return (
    <div className={classes.container} ref={ref}>
      {doneIssues.map(({ id, title, statistics }) => (
        <div key={id} className={classes.wrapper}>
          <p className={classes.issueTitle}>{title}</p>
          <div className={classes.cardsContainer}>
            {statistics?.map(({ scoreType, scoreValue, percent }) => (
              <div key={scoreValue} className={classes.card}>
                <GameCard scoreType={scoreType} scoreValue={scoreValue} isCurrent={false} />
                <p>{percent.toFixed(0)}%</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

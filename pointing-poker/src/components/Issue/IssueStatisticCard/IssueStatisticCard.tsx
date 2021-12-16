import { FC } from 'react';
import { VALUE_COFFE, VALUE_UNKNOWN } from '../../../constants';
import { IssueStatistics } from '../../../interfaces';
import classes from './IssueStatisticCard.module.scss';

interface StatisticCardProps {
  statistics: IssueStatistics[];
}

export const IssueStatisticCard: FC<StatisticCardProps> = ({ statistics }) => {
  return (
    <div className={classes.statisticCard}>
      {statistics.map(({ scoreType, scoreValue, percent }) => (
        <div key={scoreValue}>
          <span>{scoreValue}</span>
          {scoreValue === VALUE_UNKNOWN || scoreValue === VALUE_COFFE ? null : <span>{scoreType}</span>}
          <span>-{percent.toFixed(0)}%</span>
        </div>
      ))}
    </div>
  );
};

import { FC } from 'react';
import { VALUE_COFFE, VALUE_UNKNOWN } from '../../constants';
import { IssueStatistics } from '../../interfaces';
import classes from './StatisticCard.module.scss';

interface IStatisticCardProps {
  statistics: IssueStatistics[];
}

const StatisticCard: FC<IStatisticCardProps> = ({ statistics }) => {
  return (
    <div className={classes.statisticCard}>
      {statistics.map(({ scoreType, scoreValue, percent }) => (
        <div key={scoreValue}>
          <span>{scoreValue}</span>
          {scoreValue === VALUE_UNKNOWN || scoreValue === VALUE_COFFE ? null : <span>{scoreType}</span>}
          <span>-{percent}%</span>
        </div>
      ))}
    </div>
  );
};

export { StatisticCard };

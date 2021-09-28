import { FC } from 'react';
import classes from './UserList.module.scss';

interface IProps {
  scoreType?: string;
  scoreValue?: string;
}

const ScoreCard: FC<IProps> = ({ scoreType, scoreValue }) => {
  return (
    <div className={classes.scoreCard}>
      <span>{scoreValue}</span>
      <span>{scoreType}</span>
    </div>
  );
};

export { ScoreCard };

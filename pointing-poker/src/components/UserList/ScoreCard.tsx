import { FC } from 'react';
import { VALUE_COFFE, VALUE_UNKNOWN } from '../../constants';
import classes from './UserList.module.scss';

interface IProps {
  scoreType?: string;
  scoreValue?: string;
  isScoreVisible: boolean;
}

const ScoreCard: FC<IProps> = ({ scoreType, scoreValue, isScoreVisible }) => {
  const isVisibleScoreType = !(scoreValue === VALUE_UNKNOWN || scoreValue === VALUE_COFFE);
  return (
    <div className={classes.scoreCard}>
      {isScoreVisible ? (
        <>
          <span>{scoreValue}</span>
          {isVisibleScoreType && <span>{scoreType}</span>}
        </>
      ) : (
        <span>Processing</span>
      )}
    </div>
  );
};

export { ScoreCard };

import { FC } from 'react';
import { useAppSelector } from '../../hooks';
import classes from './UserList.module.scss';

interface IProps {
  scoreType?: string;
  scoreValue?: string;
}

const ScoreCard: FC<IProps> = ({ scoreType, scoreValue }) => {
  const isRoundActive = useAppSelector(state => state.gameRound.isActive);
  return (
    <div className={classes.scoreCard}>
      {isRoundActive ? (
        <span>In progress</span>
      ) : (
        <p>
          <span>{scoreValue}</span>
          <span>{scoreType}</span>
        </p>
      )}
    </div>
  );
};

export { ScoreCard };

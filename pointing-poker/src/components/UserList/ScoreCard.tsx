import { FC } from 'react';
import { useAppSelector } from '../../hooks';
import classes from './UserList.module.scss';

interface IProps {
  scoreType?: string;
  scoreValue?: string;
}

const ScoreCard: FC<IProps> = ({ scoreType, scoreValue }) => {
  const roundIsActive = useAppSelector(state => state.gameRound.isActive);
  return (
    <div className={classes.scoreCard}>
      {roundIsActive ? (
        <p>In progress</p>
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

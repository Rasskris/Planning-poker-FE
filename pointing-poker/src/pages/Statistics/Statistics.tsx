import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { GameCard } from '../../components';
import { useAppSelector } from '../../hooks';
import { selectDoneIssues } from '../../redux/selectors';
import classes from './Statistics.module.scss';

const Statistics: FC = () => {
  const doneIssues = useAppSelector(selectDoneIssues);
  return (
    <section>
      <NavLink className={classes.link} exact to="/game">
        Back to Game
      </NavLink>
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
    </section>
  );
};

export { Statistics };

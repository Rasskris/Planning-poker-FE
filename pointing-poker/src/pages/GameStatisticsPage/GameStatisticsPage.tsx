import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GameStatistics } from '../../components';
import { useAppDispatch } from '../../hooks';
import { IUser } from '../../interfaces';
import { getDataAllRoundsOfGame } from '../../redux/thunks';
import classes from './GameStatisticsPage.module.scss';

interface IGameStatisticsPageProps {
  currentUser?: IUser | null;
}

const GameStatisticsPage: FC<IGameStatisticsPageProps> = ({ currentUser }) => {
  const gameId = currentUser ? currentUser.gameId : null;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!gameId) return;
    dispatch(getDataAllRoundsOfGame(gameId));
  });

  return (
    <section className={classes.statistics}>
      <Link className={classes.link} to="/game">
        Back to Game
      </Link>
      <GameStatistics />
    </section>
  );
};

export { GameStatisticsPage };

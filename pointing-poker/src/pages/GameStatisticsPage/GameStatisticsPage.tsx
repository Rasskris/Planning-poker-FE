import { FC, useEffect } from 'react';
import { GameStatistics } from '../../components';
import { useAppDispatch } from '../../hooks';
import { IUser } from '../../interfaces';
import { getDataAllRoundsOfGame } from '../../redux/thunks';

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

  return <GameStatistics />;
};

export { GameStatisticsPage };

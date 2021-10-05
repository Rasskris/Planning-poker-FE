import { FC, useEffect, useRef } from 'react';
import { Button, GameStatistics } from '../../components';
import { useAppDispatch } from '../../hooks';
import { IUser } from '../../interfaces';
import { getDataAllRoundsOfGame } from '../../redux/thunks';
import ReactToPrint from 'react-to-print';
import { Link } from 'react-router-dom';
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

  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={classes.statisticsWrapper}>
      <Link className={classes.link} to="/game">
        Back to Game
      </Link>
      <ReactToPrint
        trigger={() => <Button text="Download PDF Results" colorButton="dark" type="button"></Button>}
        content={() => {
          return componentRef.current;
        }}
        documentTitle="Results"
      />
      <div ref={componentRef}>
        <GameStatistics />
      </div>
    </div>
  );
};

export { GameStatisticsPage };

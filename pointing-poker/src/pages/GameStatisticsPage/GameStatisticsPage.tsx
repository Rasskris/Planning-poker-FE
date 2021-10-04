import { FC, useEffect, useRef } from 'react';
import {Button, GameStatistics} from '../../components';
import { useAppDispatch } from '../../hooks';
import { IUser } from '../../interfaces';
import { getDataAllRoundsOfGame } from '../../redux/thunks';
import ReactToPrint from 'react-to-print';

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
      <>
        <ReactToPrint
            trigger={() => <Button text="Print Results" colorButton="dark" type="button"></Button>}
            content={() => {
              return componentRef.current;
            }}
            documentTitle="Results"
        />
          <div ref={componentRef}>
              <GameStatistics />
          </div>
      </>
  );
};

export { GameStatisticsPage };

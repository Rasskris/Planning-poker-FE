import { FC } from 'react';
import { GameCard } from '..';
import { useAppSelector } from '../../hooks';
import { selectIssues } from '../../redux/selectors';
import classes from './GameStatistics.module.scss';
import { PieChartComponent } from '../PieChart';
import { IStatistics } from '../PieChart/PieChart';

interface IGameStatisticsProps {
  onClickCancel?: () => void;
}

const GameStatistics: FC<IGameStatisticsProps> = ({ onClickCancel }) => {
  const gameStatistics = useAppSelector(state => state.gameStatistics.gameStatistics);
  const allIssues = useAppSelector(selectIssues);

  const getRoundData = () => {
    return (
      <div className={classes.game_statistics_wrapper}>
        {gameStatistics.map(round => {
          const scoreTypeValue = round.scoreTypeValue;
          const precent: string[] = Object.values(round.roundStatistics);
          const cardScoreValue = Object.keys(round.roundStatistics);
          const issueName = allIssues.find(issue => issue.id === round.currentIssue);
          const votesByIssues = Object.values<string>(round.playerCards).reduce<Record<string, number>>((acc, item) => {
            const newValue = (acc[item] || 0) + 1;
            return {
              ...acc,
              [item]: newValue,
            };
          }, {});
          const pieChartData: Array<IStatistics> = Object.entries(votesByIssues).map(item => {
            return { name: item[0], value: item[1] };
          });

          return (
            <div key={issueName?.id} className={classes.game_statistics_issue}>
              <p className={classes.game_statistics_title}>{issueName?.title}</p>
              <div className={classes.game_statistics_content}>
                <div className={classes.game_statistics_cards}>
                  {cardScoreValue.map((scoreValue, index) => {
                    return (
                      <div key={scoreValue}>
                        <GameCard isCurrent={false} scoreType={scoreTypeValue} scoreValue={scoreValue} />
                        <div>{precent[index]}%</div>
                      </div>
                    );
                  })}
                </div>
                <PieChartComponent data={pieChartData} />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {onClickCancel && <div className={classes.cancel_button} onClick={onClickCancel}></div>}
      {gameStatistics.length !== 0 ? getRoundData() : <div>No statistics</div>}
    </div>
  );
};

export { GameStatistics };

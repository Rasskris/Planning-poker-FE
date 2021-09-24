import { FC } from 'react';
import { IssueList } from '../../components';
import classes from './Game.module.scss';

const Game: FC = () => {
  return (
    <div className={classes.game}>
      <div className={classes.wrapper}>
        <IssueList />
      </div>
    </div>
  );
};

export { Game };

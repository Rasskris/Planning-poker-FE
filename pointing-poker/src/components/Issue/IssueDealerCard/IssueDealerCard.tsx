import { FC } from 'react';
import classes from './IssueDealerCard.module.scss';

interface Props {
  onClick: VoidFunction;
}

export const IssueDealerCard: FC<Props> = ({ onClick }) => {
  return (
    <div className={classes.issueCard}>
      <p>Create New Issue</p>
      <button className={classes.btnCreate} onClick={onClick}></button>
    </div>
  );
};

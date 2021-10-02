import { FC } from 'react';
import { Button } from '..';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectNewComers } from '../../redux/selectors';
import { NEWCOMER_LIST_EMPTY, WAITING_LIST_TEXT, WAITING_LIST_TITLE } from '../../constants';
import { admitNewComer, rejectNewComer } from '../../redux/thunks';
import classes from './WaitingList.module.scss';

const WaitingList: FC = () => {
  const newComers = useAppSelector(selectNewComers);
  const isNewComerListEmpty = newComers.length === 0;
  const dispatch = useAppDispatch();

  const handleClickAdmit = (newComerId: string, gameId: string) => () => {
    dispatch(admitNewComer({ newComerId, gameId }));
  };

  const handleClickReject = (newComerId: string) => () => {
    dispatch(rejectNewComer(newComerId));
  };

  return (
    <div className={classes.newComerList}>
      <p className={classes.title}>{WAITING_LIST_TITLE}</p>
      {isNewComerListEmpty ? <p>{NEWCOMER_LIST_EMPTY}</p> : <p>{WAITING_LIST_TEXT}</p>}
      {newComers.map(({ id, firstName, gameId }) => (
        <div key={id}>
          <span className={classes.name}>{firstName}</span>
          <div className={classes.btnContainer}>
            <Button type="button" text="Admit" colorButton="dark" onClick={handleClickAdmit(id, gameId)} />
            <Button type="button" text="Reject" colorButton="dark" onClick={handleClickReject(id)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export { WaitingList };

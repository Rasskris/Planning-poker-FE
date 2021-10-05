import { FC } from 'react';
import { Button } from '..';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectNewComers } from '../../redux/selectors';
import { NEWCOMER_LIST_EMPTY, WAITING_LIST_TEXT, WAITING_LIST_TITLE } from '../../constants';
import classes from './WaitingList.module.scss';
import { admitNewComer, rejectNewComer } from '../../redux/thunks';

const WaitingList: FC = () => {
  const newComers = useAppSelector(selectNewComers);
  const isNewComerListEmpty = newComers.length === 0;
  const dispatch = useAppDispatch();

  const handleClickAdmit = (id: string) => () => {
    dispatch(admitNewComer(id));
  };

  const handleClickReject = (id: string) => () => {
    dispatch(rejectNewComer(id));
  };

  return (
    <div className={classes.newComerList}>
      <p className={classes.title}>{WAITING_LIST_TITLE}</p>
      <p className={classes.newComer}>{isNewComerListEmpty ? NEWCOMER_LIST_EMPTY : WAITING_LIST_TEXT}</p>
      {newComers.map(({ id, firstName }) => (
        <div key={id}>
          <span className={classes.name}>{firstName}</span>
          <div className={classes.btnContainer}>
            <Button type="button" text="Admit" colorButton="dark" onClick={handleClickAdmit(id)} />
            <Button type="button" text="Reject" colorButton="dark" onClick={handleClickReject(id)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export { WaitingList };

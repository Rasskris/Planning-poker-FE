import { FC, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import { Button, IssuesStatistics } from '../../components';
import classes from './Statistics.module.scss';

const Statistics: FC = () => {
  const componentRef = useRef(null);

  return (
    <section className={classes.statisticsContainer}>
      <NavLink className={classes.link} exact to="/game">
        Back to Game
      </NavLink>
      <ReactToPrint
        trigger={() => <Button text="Download PDF Results" colorButton="dark" type="button"></Button>}
        content={() => componentRef.current}
      />
      <IssuesStatistics ref={componentRef} />
    </section>
  );
};

export { Statistics };

import { FC } from 'react';
import { UserCard } from '..';
import { useAppSelector } from '../../hooks';
import { IUser } from '../../interfaces';
import { IObjectType } from '../../interfaces/IObjectType';
import { selectGameStatus } from '../../redux/selectors';
import { ScoreCard } from './ScoreCard';
import classes from './UserList.module.scss';

interface IUserListProps {
  title: string;
  users: IUser[];
  isScoreVisible?: boolean;
  currentUserId: string;
  isPlayer?: boolean;
  handleKickUser: (id: string, name: string) => void;
}

const UserList: FC<IUserListProps> = ({ isScoreVisible, isPlayer, title, users, currentUserId, handleKickUser }) => {
  const isGameStarted = useAppSelector(selectGameStatus);
  const playerCards: IObjectType = useAppSelector(state => state.gameRound.playerCards);
  const scoreType = useAppSelector(state => state.gameRound.scoreTypeValue);

  const getScoreCard = (id: string) => {
    const scoreValue = playerCards[id] ? playerCards[id] : 'unknown';
    return <ScoreCard scoreType={scoreType} scoreValue={scoreValue} />;
  };

  return (
    <div className={classes.userList}>
      <div className={classes.titleWrapper}>
        {isGameStarted && isPlayer && <p className={classes.title}>Score</p>}
        <p className={classes.title}>{title}</p>
      </div>
      <div className={classes.cardsWrapper}>
        {users.map(({ id, firstName, lastName, role, avatar, jobPosition, selectedCard }) => (
          <div className={classes.cardWrapper} key={id}>
            {isGameStarted && isPlayer && getScoreCard(id)}
            <UserCard
              id={id}
              currentUserId={currentUserId}
              firstName={firstName}
              lastName={lastName}
              avatar={avatar as string}
              jobPosition={jobPosition}
              handleKickUser={handleKickUser}
              role={role}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { UserList };

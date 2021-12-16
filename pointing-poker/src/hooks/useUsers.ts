import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { selectDealer, selectObservers, selectPlayers } from '../redux/selectors';
import { getUsers } from '../redux/thunks';

export const useUsers = (gameId: string) => {
  const dealer = useAppSelector(selectDealer);
  const players = useAppSelector(selectPlayers);
  const observers = useAppSelector(selectObservers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers(gameId));
  }, [dispatch, gameId, players, dealer, observers]);

  return { dealer, players, observers };
};

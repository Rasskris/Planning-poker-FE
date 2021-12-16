import { useEffect, useState } from 'react';
import { ROUND_STATUS } from '../enums';
import { selectRoundStatus } from '../redux/selectors';
import { useAppSelector } from './useAppSelector';

export const useCurrentGameCard = () => {
  const roundStatus = useAppSelector(selectRoundStatus);
  const [currentGameCard, setCurrentGameCard] = useState<string | null>(null);

  useEffect(() => {
    if (currentGameCard && roundStatus === ROUND_STATUS.FINISHED) {
      setCurrentGameCard(null);
    }
  }, [roundStatus, currentGameCard]);

  return [currentGameCard, setCurrentGameCard] as const;
};

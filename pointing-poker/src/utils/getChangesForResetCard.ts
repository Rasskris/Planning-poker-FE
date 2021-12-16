import { VALUE_UNKNOWN } from '../constants';

export const getChangesForResetCard = (playersIds: Array<string | number>, scoreType: string) => {
  return playersIds.map(id => {
    return {
      id,
      changes: {
        selectedCard: {
          scoreType,
          scoreValue: VALUE_UNKNOWN,
        },
      },
    };
  });
};

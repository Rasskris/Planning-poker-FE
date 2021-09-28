import { IObjectType } from '../interfaces/IObjectType';

interface ICheckingNumberPlayersPlayedProps {
  playerCards: IObjectType;
  automaticFlipCardsSetting: boolean;
}

export const checkingNumberPlayersPlayed = async ({
  playerCards,
  automaticFlipCardsSetting,
}: ICheckingNumberPlayersPlayedProps) => {
  if (automaticFlipCardsSetting) {
    if (Object.keys(playerCards).length !== 0) {
      if (Object.values(playerCards).every(elem => elem !== null)) {
        return Promise.resolve();
      }
    }
  }
  return Promise.reject();
};

import { IObjectType } from '../interfaces/IObjectType';
import _ from 'lodash';

interface ICheckingNumberPlayersPlayedProps {
  playerCards: IObjectType;
  automaticFlipCardsSetting: boolean;
}

export const checkingNumberPlayersPlayed = async ({
  playerCards,
  automaticFlipCardsSetting,
}: ICheckingNumberPlayersPlayedProps) => {
  if (automaticFlipCardsSetting) {
    if (_.size(playerCards) !== 0) {
      if (Object.values(playerCards).every(elem => elem !== null)) {
        return Promise.resolve();
      }
    }
  }
  return Promise.reject();
};

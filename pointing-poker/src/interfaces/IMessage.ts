import { IUser } from './IUser';

export interface IMessage {
  id?: string;
  text: string;
  sender: IUser;
  gameId: string;
}

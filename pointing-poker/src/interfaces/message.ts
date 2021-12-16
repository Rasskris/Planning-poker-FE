import { User } from './user';

export interface Message {
  id?: string;
  text: string;
  sender: User;
  gameId: string;
}

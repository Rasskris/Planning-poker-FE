import { User } from './User';

export interface Message {
  id?: string;
  text: string;
  sender: User;
  gameId: string;
}

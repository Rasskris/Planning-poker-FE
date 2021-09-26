import { IUser } from './IUser';

export interface ICurrentUser {
  isLogin: boolean;
  user: null | IUser;
}

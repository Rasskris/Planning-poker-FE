import { IUser } from './IUser';

export interface ICurrentUser {
  isLogin: boolean;
  user: null | IUser;
  isPendingDealerAnswer: boolean;
  isAutoAdmitedToGame: boolean;
  isRejectedToGame: boolean;
}

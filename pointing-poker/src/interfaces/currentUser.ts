import { User } from './user';

export interface CurrentUser {
  isLoggedIn: boolean;
  user: null | User;
  loading: boolean;
  isPendingDealerAnswer: boolean;
  isAutoAdmitedToGame: boolean;
  isAccessToGameRejected: boolean;
}

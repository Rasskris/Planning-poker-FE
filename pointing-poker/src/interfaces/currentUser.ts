import { User } from './user';

export interface CurrentUser {
  isLoggedIn: boolean;
  user: null | User;
  loading: boolean;
  authSuccess: string | null;
  isPendingDealerAnswer: boolean;
  isAutoAdmitedToGame: boolean;
  isAccessToGameRejected: boolean;
}

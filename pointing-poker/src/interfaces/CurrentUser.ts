import { User } from './User';

export interface CurrentUser {
  isLogin: boolean;
  user: null | User;
}

import { USER_ROLES } from '../constants';

export interface IUser {
  id: string;
  firstName: string;
  lastName?: string;
  jobPosition?: string;
  role: USER_ROLES;
  image?: string;
  gameId: string;
}

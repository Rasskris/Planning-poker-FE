import { USER_ROLES } from '../constants';

export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  jobPosition?: string;
  role: USER_ROLES;
  image?: string;
  gameId: string;
}

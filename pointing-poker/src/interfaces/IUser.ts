import { USER_ROLES } from '../constants';

export interface IUser {
  id: string;
  gameId: string;
  firstName: string;
  lastName?: string;
  jobPosition?: string;
  role: USER_ROLES;
  avatar?: string | File;
  selectedCard?: {
    scoreType: string;
    scoreValue: string;
  };
}

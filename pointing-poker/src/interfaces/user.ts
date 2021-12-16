import { USER_ROLES } from '../enums';

export interface User {
  id: string;
  gameId: string;
  firstName: string;
  lastName: string;
  jobPosition: string;
  role: USER_ROLES;
  selectedCard?: {
    scoreType: string;
    scoreValue: string;
  };
}

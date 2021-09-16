export enum UserRole {
  dealer = 'dealer',
  player = 'player',
  observer = 'observer',
}

export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  jobPosition?: string;
  role: UserRole;
  image?: string;
  gameId: string;
}

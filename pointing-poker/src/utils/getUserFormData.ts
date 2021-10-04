import { IUser } from '../interfaces';

export const getUserFormData = (userData: Omit<IUser, 'id' | 'gameId' | 'selectedCard'>) => {
  const userFormData = new FormData();

  Object.entries(userData).forEach(([key, value]) => {
    key && value && userFormData.append(key, value);
  });

  return userFormData;
};

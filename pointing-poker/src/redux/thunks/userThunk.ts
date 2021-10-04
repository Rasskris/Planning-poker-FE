import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAPI } from '../../libs';
import { IUser } from '../../interfaces';

interface IParams {
  currentUserId: string;
  victimId?: string;
}

export const getUsers = createAsyncThunk('user/getUsers', async (gameId: string) => {
  const data = await clientAPI.get(`/api/users/${gameId}`);

  return data;
});

export const addUser = createAsyncThunk('user/addUser', async (user: Omit<IUser, 'id' | 'gameId'>) => {
  const data = await clientAPI.postUserData(`/api/users`, user);

  return data;
});

export const updateUser = createAsyncThunk('user/updateUser', async (user: Partial<IUser>) => {
  const data = await clientAPI.put('/api/users', user);

  return data;
});

export const deleteUser = createAsyncThunk('user/deleteUser', async ({ currentUserId, victimId }: IParams) => {
  const { id } = await clientAPI.delete('/api/users', { currentUserId, victimId });

  return id;
});

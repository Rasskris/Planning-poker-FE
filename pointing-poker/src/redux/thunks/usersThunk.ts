import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAPI } from '../../libs';
import { User } from '../../interfaces';

export const getUsers = createAsyncThunk('user/getUsers', async (gameId: string) => {
  const data = await clientAPI.get(`/api/users/${gameId}`);

  return data;
});

export const addUser = createAsyncThunk('user/addUser', async (user: Partial<User>) => {
  const data = await clientAPI.post(`/api/users`, user);

  return data;
});

export const updateUser = createAsyncThunk('user/updateUser', async (user: Partial<User>) => {
  const data = await clientAPI.put('/api/users', user);

  return data;
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (currentUserId: string) => {
  const { id } = await clientAPI.delete(`/api/users/${currentUserId}`);

  return id;
});

export const deleteVictim = createAsyncThunk('user/deleteUser', async (victimId: string) => {
  const { id } = await clientAPI.delete(`/api/users/victim/${victimId}`);

  return id;
});

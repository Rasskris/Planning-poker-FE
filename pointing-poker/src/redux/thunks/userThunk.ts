import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAPI } from '../../libs';
import { User } from '../../interfaces';

export const getUsers = createAsyncThunk('user/getUsers', async (gameId: string) => {
  const data = await clientAPI.get(`/api/users/${gameId}`);

  return { users: data };
});

export const addUser = createAsyncThunk('user/addUser', async (user: Partial<User>) => {
  const data = await clientAPI.post(`/api/users`, user);

  return data;
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (userId: string) => {
  const { id } = await clientAPI.delete(`/api/users/${userId}`);

  return id;
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAPI } from '../../libs';

export const admitNewComer = createAsyncThunk('newComer/admitNewComer', async (newComerId: string) => {
  const { id } = await clientAPI.get(`/api/users/admit/${newComerId}`);

  return id;
});

export const rejectNewComer = createAsyncThunk('newComer/rejectNewComer', async (newComerId: string) => {
  const { id } = await clientAPI.get(`/api/users/reject/${newComerId}`);

  return id;
});

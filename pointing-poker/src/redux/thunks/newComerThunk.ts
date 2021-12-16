import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAPI } from '../../libs';

interface IParams {
  newComerId: string;
  gameId: string;
}

export const admitNewComer = createAsyncThunk('newComer/admitNewComer', async ({ newComerId, gameId }: IParams) => {
  const { id } = await clientAPI.put(`/api/users/admit/${newComerId}`, { gameId });

  return id;
});

export const rejectNewComer = createAsyncThunk('newComer/rejectNewComer', async (newComerId: string) => {
  const { id } = await clientAPI.put(`/api/users/reject/${newComerId}`);

  return id;
});

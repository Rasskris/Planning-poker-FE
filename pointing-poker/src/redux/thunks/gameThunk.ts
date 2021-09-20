import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAPI } from '../../libs';

export const checkExistGame = createAsyncThunk('game/getGame', async (gameId: string) => {
  const data = await clientAPI.get(`/api/games/${gameId}`);

  return data;
});

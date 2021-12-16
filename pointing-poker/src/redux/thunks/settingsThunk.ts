import { createAsyncThunk } from '@reduxjs/toolkit';
import { Settings } from '../../interfaces';
import { clientAPI } from '../../libs';

interface Params {
  userId: string;
  settings: Settings;
  gameId: string;
}
export const getSettings = createAsyncThunk('settings/getSettings', async (gameId: string) => {
  const data = await clientAPI.get(`/api/settings/${gameId}`);

  return data;
});

export const updateSettings = createAsyncThunk(
  'settings/updateSettings',
  async ({ userId, settings, gameId }: Params) => {
    const data = await clientAPI.put(`/api/settings/${gameId}`, { userId, settings });

    return data;
  },
);

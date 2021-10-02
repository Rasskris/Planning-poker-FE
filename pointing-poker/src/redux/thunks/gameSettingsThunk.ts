import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGameSettings } from '../../interfaces/IGameSettings';
import { clientAPI } from '../../libs';

interface IParams {
  userId: string;
  settings: IGameSettings;
  gameId: string;
}

export const updateGameSettings = createAsyncThunk(
  'gameSettings/updateGameSettings',
  async ({ userId, settings, gameId }: IParams) => {
    const data = await clientAPI.put(`/api/settings/${gameId}`, { userId, settings });
    console.log(settings);
    return data;
  },
);

export const getGameSettings = createAsyncThunk('gameSettings/getGameSettings', async (gameId: string) => {
  const data = await clientAPI.get(`/api/settings/${gameId}`);

  return data;
});

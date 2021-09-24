import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGameSettings } from '../../interfaces/IGameSettings';
import { clientAPI } from '../../libs';

interface IAddGameSettings {
  userId: string;
  settings: IGameSettings;
  gameId: string;
}

export const addGameSettings = createAsyncThunk(
  'gameSettings/addGameSettings',
  async ({ userId, settings, gameId }: IAddGameSettings) => {
    const data = await clientAPI.post(`/api/settings/${gameId}`, { userId, settings });
    return data;
  },
);

export const getGameSettings = createAsyncThunk('gameSettings/getGameSettings', async (gameId: string) => {
  const data = await clientAPI.get(`/api/settings/${gameId}`);
  return data;
});

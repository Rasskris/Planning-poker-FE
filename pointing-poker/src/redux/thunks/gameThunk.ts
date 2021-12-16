import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAPI } from '../../libs';

interface IParams {
  gameId: string;
  currentUserId: string;
  isStarted: boolean;
}

export const checkExistGame = createAsyncThunk('game/getGame', async (gameId: string) => {
  const data = await clientAPI.get(`/api/games/${gameId}`);

  return data;
});

export const updateGameStatus = createAsyncThunk(
  'game/updateGameStatus',
  async ({ gameId, currentUserId, isStarted }: IParams) => {
    const { status } = await clientAPI.put(`/api/games/${gameId}`, { currentUserId, isStarted });

    return status;
  },
);

export const deleteGame = createAsyncThunk('game/deleteGame', async (gameId: string) => {
  const { id } = await clientAPI.delete(`/api/games/${gameId}`);

  return id;
});

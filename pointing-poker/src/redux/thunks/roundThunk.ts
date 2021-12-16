import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAPI } from '../../libs';

interface Params {
  gameId: string;
  userId: string;
}

export const getRoundStatus = createAsyncThunk('round/getRoundStatus', async (gameId: string) => {
  const { roundStatus } = await clientAPI.get(`/api/round/${gameId}`);

  return roundStatus;
});

export const startRound = createAsyncThunk('round/startRound', async ({ gameId, userId }: Params) => {
  const { roundStatus } = await clientAPI.put(`/api/round/start/${gameId}`, { userId });

  return roundStatus;
});

export const finishRound = createAsyncThunk('round/finishRound', async (gameId: string) => {
  const { roundStatus } = await clientAPI.put(`/api/round/finish/${gameId}`);

  return roundStatus;
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ROUND_STATUS } from '../../constants';
import { clientAPI } from '../../libs';

interface IRound {
  gameId: string;
  userId: string;
  roundStatus: ROUND_STATUS;
}

export const getRoundStatus = createAsyncThunk('round/getRoundStatus', async (gameId: string) => {
  const { status } = await clientAPI.get(`/api/round/${gameId}`);

  return status;
});

export const updateRoundStatus = createAsyncThunk(
  'round/updateRound',
  async ({ gameId, userId, roundStatus }: IRound) => {
    const { status } = await clientAPI.put(`/api/round/${gameId}`, { userId, roundStatus });

    return status;
  },
);

export const stopTimer = createAsyncThunk('round/stopTimer', async (gameId: string) => {
  const data = await clientAPI.get(`/api/round/timer/${gameId}`);

  return data;
});

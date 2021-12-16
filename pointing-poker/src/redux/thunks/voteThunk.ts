import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAPI } from '../../libs';

interface VoteParams {
  gameId: string;
  victimId: string;
  currentUserId: string;
}

export const addVote = createAsyncThunk('vote/addVote', async ({ gameId, victimId, currentUserId }: VoteParams) => {
  const data = await clientAPI.post('/api/vote', { gameId, victimId, currentUserId });

  return data;
});

export const putVoteForKick = createAsyncThunk('vote/putVoteForKick', async (gameId: string) => {
  const data = await clientAPI.put('/api/vote/for', { gameId });

  return data;
});

export const putVoteAgainstKick = createAsyncThunk('vote/putVoteAgainstKick', async (gameId: string) => {
  const data = await clientAPI.put('/api/vote/against', { gameId });

  return data;
});

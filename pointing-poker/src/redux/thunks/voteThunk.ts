import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAPI } from '../../libs';

export const putVoteForKick = createAsyncThunk('vote/putVote', async (gameId: string) => {
  const data = await clientAPI.put(`/api/vote`, { gameId });

  return data;
});

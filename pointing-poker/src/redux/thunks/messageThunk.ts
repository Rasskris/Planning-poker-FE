import { createAsyncThunk } from '@reduxjs/toolkit';
import { loader } from '../../libs';
import { Message } from '../../interfaces';

export const getMessages = createAsyncThunk('message/getMessages', async (gameId: string) => {
  const data = await loader.get(`/api/messages/${gameId}`);

  return { messages: data };
});

export const addMessage = createAsyncThunk('message/addMessage', async (message: Message) => {
  const data = await loader.post(`/api/messages`, message);

  return data;
});

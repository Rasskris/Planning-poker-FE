import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAPI } from '../../libs';
import { Message } from '../../interfaces';

export const getMessages = createAsyncThunk('message/getMessages', async (gameId: string) => {
  const data = await clientAPI.get(`/api/messages/${gameId}`);

  return { messages: data };
});

export const addMessage = createAsyncThunk('message/addMessage', async (message: Message) => {
  const data = await clientAPI.post(`/api/messages`, message);

  return data;
});

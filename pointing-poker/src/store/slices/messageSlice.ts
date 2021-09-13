import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { loader } from '../../lib';
import { User } from '../../interfaces';

interface Message {
  id?: string;
  text: string;
  sender: User;
  gameId: string;
}

const messagesAdapter = createEntityAdapter<Message>({
  selectId: message => message.id!,
});

const initialState = messagesAdapter.getInitialState();

export const getMessages = createAsyncThunk('message/getMessages', async (gameId: string) => {
  const data = await loader.get(`/api/messages/${gameId}`);

  return { messages: data };
});

export const addMessage = createAsyncThunk('message/addMessage', async (message: Message) => {
  const data = await loader.post(`/api/messages`, message);

  return data;
});

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMessages.fulfilled, (state, { payload }) => {
        messagesAdapter.addMany(state, payload.messages);
      })
      .addCase(addMessage.fulfilled, (state, { payload }) => {
        messagesAdapter.addOne(state, payload);
      });
  },
});

export const messageReducer = messageSlice.reducer;

export const { selectAll: selectMessages } = messagesAdapter.getSelectors<RootState>(state => state.messages);

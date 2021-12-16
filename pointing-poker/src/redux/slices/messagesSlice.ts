import { createSlice } from '@reduxjs/toolkit';
import { messagesAdapter } from '../adapters';
import { getMessages, addMessage } from '../thunks';

const initialState = messagesAdapter.getInitialState();

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

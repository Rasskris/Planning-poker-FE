import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IChat {
  isOpen: boolean;
}

const initialState: IChat = {
  isOpen: false,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    changeChatStatus: (state, { payload }: PayloadAction<boolean>) => {
      state.isOpen = payload;
    },
  },
});

export const { changeChatStatus } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;

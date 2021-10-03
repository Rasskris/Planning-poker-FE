import { createSlice } from '@reduxjs/toolkit';
import { ICurrentUser } from '../../interfaces';
import { addUser } from '../thunks';

const initialState: ICurrentUser = {
  isLogin: false,
  user: null,
  isPendingDealerAnswer: false,
  isAutoAdmitedToGame: false,
  isAccessToGameRejected: false,
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    admitToGame: state => {
      state.isPendingDealerAnswer = false;
    },
    rejectToGame: state => {
      state.isPendingDealerAnswer = false;
      state.isAccessToGameRejected = true;
    },
    resetAdmitedToGameStatus: state => {
      state.isAutoAdmitedToGame = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(addUser.fulfilled, (state, { payload }) => {
      state.isLogin = true;
      state.user = payload.user;
      state.isPendingDealerAnswer = payload.isPendingDealerAnswer;
      state.isAutoAdmitedToGame = payload.isAutoAdmitedToGame;
    });
  },
});

export const { admitToGame, rejectToGame, resetAdmitedToGameStatus } = currentUserSlice.actions;
export const currentUserReducer = currentUserSlice.reducer;

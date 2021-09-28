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
    deleteCurrentUser: state => {
      state.isLogin = false;
      state.user = null;
    },
    admitToGame: state => {
      state.isPendingDealerAnswer = false;
    },
    rejectToGame: state => {
      state.isPendingDealerAnswer = false;
      state.isAccessToGameRejected = true;
    },
    resetRejectedStatus: state => {
      state.isAccessToGameRejected = false;
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

export const { deleteCurrentUser, admitToGame, rejectToGame, resetRejectedStatus, resetAdmitedToGameStatus } =
  currentUserSlice.actions;
export const currentUserReducer = currentUserSlice.reducer;

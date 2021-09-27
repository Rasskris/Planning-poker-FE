import { createSlice } from '@reduxjs/toolkit';
import { ICurrentUser } from '../../interfaces';
import { addUser } from '../thunks';

const initialState: ICurrentUser = {
  isLogin: false,
  user: null,
  isPendingDealerAnswer: false,
  isAutoAdmitedToGame: false,
  isRejectedToGame: false,
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
      state.isRejectedToGame = true;
    },
    resetRejectedStatus: state => {
      state.isRejectedToGame = false;
    },
    resetAdmitedToGameStatus: state => {
      state.isAutoAdmitedToGame = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(addUser.fulfilled, (state, { payload }) => {
      console.log(payload);
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

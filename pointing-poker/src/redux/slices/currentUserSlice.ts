import { createSlice } from '@reduxjs/toolkit';
import { USER_GREETING_TEXT } from '../../constants';
import { CurrentUser } from '../../interfaces';
import { addUser } from '../thunks';

const initialState: CurrentUser = {
  isLoggedIn: false,
  user: null,
  loading: false,
  authSuccess: null,
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
    clearAuthSuccess: state => {
      state.authSuccess = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addUser.pending, state => {
        state.loading = true;
      })
      .addCase(addUser.rejected, state => {
        state.loading = false;
      })
      .addCase(addUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = payload.user;
        state.authSuccess = USER_GREETING_TEXT;
        state.isPendingDealerAnswer = payload.isPendingDealerAnswer;
        state.isAutoAdmitedToGame = payload.isAutoAdmitedToGame;
      });
  },
});

export const { admitToGame, rejectToGame, resetAdmitedToGameStatus, clearAuthSuccess } = currentUserSlice.actions;
export const currentUserReducer = currentUserSlice.reducer;

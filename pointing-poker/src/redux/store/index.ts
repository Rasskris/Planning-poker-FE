import { AnyAction, combineReducers, Reducer } from 'redux';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { logout } from '../actions';
import {
  usersReducer,
  messageReducer,
  issueReducer,
  currentUserReducer,
  settingsReducer,
  voteReducer,
  gameReducer,
  chatReducer,
  roundReducer,
  newComerReducer,
  timerReducer,
} from '../slices';

const appReducer = combineReducers({
  game: gameReducer,
  currentUser: currentUserReducer,
  users: usersReducer,
  messages: messageReducer,
  issues: issueReducer,
  settings: settingsReducer,
  vote: voteReducer,
  chat: chatReducer,
  round: roundReducer,
  newComers: newComerReducer,
  timer: timerReducer,
});

export type RootState = ReturnType<typeof appReducer>;

export const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === logout.type) {
    state = initialRootState;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export const initialRootState = {
  ...store.getState(),
};

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

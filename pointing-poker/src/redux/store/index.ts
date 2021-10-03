import { AnyAction, combineReducers, Reducer } from 'redux';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { logout } from '../actions';
import {
  usersReducer,
  messageReducer,
  issueReducer,
  currentUserReducer,
  gameSettingsReducer,
  voteReducer,
  gameReducer,
  chatReducer,
  gameRoundReducer,
  newComerReducer,
  gameStatisticsReducer,
} from '../slices';

const appReducer = combineReducers({
  game: gameReducer,
  currentUser: currentUserReducer,
  users: usersReducer,
  messages: messageReducer,
  issues: issueReducer,
  gameSettings: gameSettingsReducer,
  vote: voteReducer,
  chat: chatReducer,
  gameRound: gameRoundReducer,
  newComers: newComerReducer,
  gameStatistics: gameStatisticsReducer,
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
});

export const initialRootState = {
  ...store.getState(),
};

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

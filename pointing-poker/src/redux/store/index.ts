import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {
  usersReducer,
  messageReducer,
  issueReducer,
  currentUserReducer,
  gameSettingsReducer,
  voteReducer,
  gameReducer,
  gameRoundReducer,
} from '../slices';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    currentUser: currentUserReducer,
    users: usersReducer,
    messages: messageReducer,
    issues: issueReducer,
    gameSettings: gameSettingsReducer,
    vote: voteReducer,
    gameRound: gameRoundReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

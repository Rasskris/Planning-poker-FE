import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
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
    chat: chatReducer,
    gameRound: gameRoundReducer,
    newComers: newComerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

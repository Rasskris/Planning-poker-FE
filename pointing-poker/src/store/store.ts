import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { userReducer, messageReducer, issueReducer } from './slices';

export const store = configureStore({
  reducer: {
    user: userReducer,
    messages: messageReducer,
    issues: issueReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

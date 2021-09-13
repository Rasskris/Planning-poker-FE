import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './slices/userSlice';
import GameSettingsReducer from './slices/gameSettingsSlice';

export const store = configureStore({
  reducer: {
    user: UserReducer,
    gameSettings: GameSettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

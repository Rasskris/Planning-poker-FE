import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Settings } from '../../interfaces';
import { getSettings } from '../thunks';

interface ITimer {
  minutes: number;
  seconds: number;
}

const initialState: ITimer = {
  minutes: 0,
  seconds: 0,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    updateTimer: (state, { payload }) => {
      const { minutes, seconds } = payload;
      state.minutes = minutes;
      state.seconds = seconds;
    },
  },
  extraReducers: builder => {
    builder.addCase(getSettings.fulfilled, (state, { payload }: PayloadAction<Settings>) => {
      const { minutes, seconds } = payload.timerValues;
      state.minutes = minutes;
      state.seconds = seconds;
    });
  },
});

export const { updateTimer } = timerSlice.actions;
export const timerReducer = timerSlice.reducer;

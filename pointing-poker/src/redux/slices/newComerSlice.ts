import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces';
import { newComerAdapter } from '../adapters';
import { admitNewComer, rejectNewComer } from '../thunks';

const initialState = newComerAdapter.getInitialState();

export const newComerSlice = createSlice({
  name: 'newComer',
  initialState,
  reducers: {
    addNewComer: (state, { payload }: PayloadAction<IUser>) => {
      newComerAdapter.addOne(state, payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(admitNewComer.fulfilled, (state, { payload }) => {
        newComerAdapter.removeOne(state, payload);
      })
      .addCase(rejectNewComer.fulfilled, (state, { payload }) => {
        newComerAdapter.removeOne(state, payload);
      });
  },
});

export const { addNewComer } = newComerSlice.actions;
export const newComerReducer = newComerSlice.reducer;

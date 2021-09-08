import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface UserState {
  firstName: string;
  lastName: string;
  jobPosition: string;
  image: string;
  observer: boolean;
}

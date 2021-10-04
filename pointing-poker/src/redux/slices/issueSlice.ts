import { createSlice } from '@reduxjs/toolkit';
import { issuesAdapter } from '../adapters';
import { getIssues, addIssue, updateIssue, deleteIssue, updateIssueStatus } from '../thunks';

const initialState = issuesAdapter.getInitialState();

export const issueSlice = createSlice({
  name: 'issue',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getIssues.fulfilled, (state, { payload }) => {
        issuesAdapter.addMany(state, payload);
      })
      .addCase(addIssue.fulfilled, (state, { payload }) => {
        issuesAdapter.addOne(state, payload);
      })
      .addCase(updateIssue.fulfilled, (state, { payload }) => {
        issuesAdapter.setAll(state, payload);
      })
      .addCase(updateIssueStatus.fulfilled, (state, { payload }) => {
        issuesAdapter.setAll(state, payload);
      })
      .addCase(deleteIssue.fulfilled, (state, { payload }) => {
        issuesAdapter.removeOne(state, payload);
      });
  },
});

export const issueReducer = issueSlice.reducer;

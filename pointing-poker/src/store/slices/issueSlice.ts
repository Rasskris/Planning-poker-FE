import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { loader } from '../../lib';

interface Issue {
  id?: string;
  title: string;
  priority: string;
  creatorId: string;
  gameId: string;
  done?: boolean;
}

export const issuesAdapter = createEntityAdapter<Issue>({
  selectId: issue => issue.id,
});

const initialState = issuesAdapter.getInitialState();

export const getIssues = createAsyncThunk('issues/getIssues', async (gameId: string) => {
  const data = await loader.get(`/api/issues/${gameId}`);
  return { issues: data, gameId };
});

export const addIssue = createAsyncThunk('issues/addIssue', async (issue: Issue) => {
  const data = await loader.post('/api/issues', issue);
  return data;
});

export const editIssue = createAsyncThunk('issues/editIssue', async (issue: Partial<Issue>) => {
  const data = await loader.put('/api/issues', issue);
  return data;
});

export const deleteIssue = createAsyncThunk('issues/deleteIssue', async (issueId: string) => {
  const data = await loader.delete(`/api/issues/${issueId}`);
  return data;
});

export const issueSlice = createSlice({
  name: 'issue',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getIssues.fulfilled, (state, { payload }) => {
        issuesAdapter.addMany(state, payload.issues);
      })
      .addCase(addIssue.fulfilled, (state, { payload }) => {
        issuesAdapter.addOne(state, payload);
      })
      .addCase(editIssue.fulfilled, (state, { payload }) => {
        issuesAdapter.updateOne(state, { id: payload._id, changes: payload });
      })
      .addCase(deleteIssue.fulfilled, (state, { payload }) => {
        issuesAdapter.removeOne(state, payload);
      });
  },
});

export const issueReducer = issueSlice.reducer;

export const { selectAll: selectIssues, selectById: selectIssueById } = issuesAdapter.getSelectors<RootState>(
  state => state.issues,
);

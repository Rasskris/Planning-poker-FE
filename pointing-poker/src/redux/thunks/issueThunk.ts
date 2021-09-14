import { createAsyncThunk } from '@reduxjs/toolkit';
import { loader } from '../../libs';
import { Issue } from '../../interfaces';

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

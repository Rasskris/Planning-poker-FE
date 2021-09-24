import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAPI } from '../../libs';
import { Issue } from '../../interfaces';

export const getIssues = createAsyncThunk('issues/getIssues', async (gameId: string) => {
  const data = await clientAPI.get(`/api/issues/${gameId}`);

  return { issues: data, gameId };
});

export const addIssue = createAsyncThunk('issues/addIssue', async (issue: Partial<Issue>) => {
  const data = await clientAPI.post('/api/issues', issue);

  return data;
});

export const updateIssue = createAsyncThunk('issues/editIssue', async (issue: Partial<Issue>) => {
  const data = await clientAPI.put('/api/issues', issue);

  return data;
});

export const deleteIssue = createAsyncThunk('issues/deleteIssue', async (issueId: string) => {
  const { id } = await clientAPI.delete(`/api/issues/${issueId}`);

  return id;
});

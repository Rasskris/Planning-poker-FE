import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAPI } from '../../libs';
import { Issue } from '../../interfaces';

export const getIssues = createAsyncThunk('issues/getIssues', async (gameId: string) => {
  const data = await clientAPI.get(`/api/issues/${gameId}`);

  return data;
});

export const addIssue = createAsyncThunk('issues/addIssue', async (issue: Partial<Issue>) => {
  const data = await clientAPI.post('/api/issues', issue);

  return data;
});

export const updateCurrentIssue = createAsyncThunk('issues/updateCurrentIssue', async (issue: Partial<Issue>) => {
  const data = await clientAPI.put('/api/issues/current', issue);

  return data;
});

export const updateDoneIssue = createAsyncThunk('issues/updateDoneIssue', async (issue: Partial<Issue>) => {
  const data = await clientAPI.put('/api/issues/done', issue);

  return data;
});

export const deleteIssue = createAsyncThunk('issues/deleteIssue', async (issueId: string) => {
  const { id } = await clientAPI.delete(`/api/issues/${issueId}`);

  return id;
});

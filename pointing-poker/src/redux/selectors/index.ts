import { RootState } from '../store';
import { issuesAdapter, messagesAdapter } from '../adapters';

export const { selectAll: selectIssues, selectById: selectIssueById } = issuesAdapter.getSelectors<RootState>(
  state => state.issues,
);

export const { selectAll: selectMessages } = messagesAdapter.getSelectors<RootState>(state => state.messages);

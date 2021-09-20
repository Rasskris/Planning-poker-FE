import { RootState } from '../store';
import { issuesAdapter, messagesAdapter, usersAdapter } from '../adapters';

export const { selectAll: selectIssues, selectById: selectIssueById } = issuesAdapter.getSelectors<RootState>(
  state => state.issues,
);

export const { selectAll: selectMessages } = messagesAdapter.getSelectors<RootState>(state => state.messages);

export const { selectAll: selectUsers } = usersAdapter.getSelectors<RootState>(state => state.users);

export const selectCurrentUser = (state: RootState) => state.currentUser.user;

export const selectLoginStatus = (state: RootState) => state.currentUser.isLogin;

export const selectExistGameStatus = (state: RootState) => state.game.isExist;

import { RootState } from '../store';
import { issuesAdapter, messagesAdapter, usersAdapter } from '../adapters';
import { createSelector } from 'reselect';
import { USER_ROLES } from '../../constants';

export const { selectAll: selectIssues } = issuesAdapter.getSelectors<RootState>(state => state.issues);

export const { selectAll: selectMessages } = messagesAdapter.getSelectors<RootState>(state => state.messages);

export const { selectAll: selectUsers, selectById: selectUserById } = usersAdapter.getSelectors<RootState>(
  state => state.users,
);

export const selectCurrentUser = (state: RootState) => state.currentUser.user;

export const selectLoginStatus = (state: RootState) => state.currentUser.isLogin;

export const selectExistGameStatus = (state: RootState) => state.game.isExist;

export const selectStatusGame = (state: RootState) => state.game.isStarded;

export const selectChatStatus = (state: RootState) => state.chat.isOpen;

export const selectVoteStatus = (state: RootState) => state.vote.isActive;

export const selectVoteVictim = (state: RootState) => state.vote.victim;

export const selectUserOpenedVote = (state: RootState) => state.vote.userOpenedVote;

export const selectScoreValues = (state: RootState) => state.gameSettings.scoreValues;

export const selectScoreTypeShort = (state: RootState) => state.gameSettings.scoreTypeShortSetting;

export const selectDealer = createSelector([selectUsers], users =>
  users.filter(user => user.role === USER_ROLES.DEALER),
);

export const selectObservers = createSelector([selectUsers], users =>
  users.filter(user => user.role === USER_ROLES.OBSERVER),
);

export const selectPlayers = createSelector([selectUsers], users =>
  users.filter(user => user.role === USER_ROLES.PLAYER),
);

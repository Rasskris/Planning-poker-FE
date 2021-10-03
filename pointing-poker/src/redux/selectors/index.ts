import { RootState } from '../store';
import { issuesAdapter, messagesAdapter, usersAdapter, newComerAdapter } from '../adapters';
import { createSelector } from 'reselect';
import { USER_ROLES } from '../../constants';

export const { selectAll: selectIssues } = issuesAdapter.getSelectors<RootState>(state => state.issues);

export const { selectAll: selectMessages } = messagesAdapter.getSelectors<RootState>(state => state.messages);

export const { selectAll: selectUsers, selectById: selectUserById } = usersAdapter.getSelectors<RootState>(
  state => state.users,
);

export const { selectAll: selectNewComers } = newComerAdapter.getSelectors<RootState>(state => state.newComers);

export const selectCurrentUser = (state: RootState) => state.currentUser.user;

export const selectLoginStatus = (state: RootState) => state.currentUser.isLogin;

export const selectPendingDealerAnswer = (state: RootState) => state.currentUser.isPendingDealerAnswer;

export const selectAutoAdmitedStatus = (state: RootState) => state.currentUser.isAutoAdmitedToGame;

export const selectRejectedToGameStatus = (state: RootState) => state.currentUser.isAccessToGameRejected;

export const selectExistGameStatus = (state: RootState) => state.game.isExist;

export const selectGameStatus = (state: RootState) => state.game.isStarded;

export const selectChatStatus = (state: RootState) => state.chat.isOpen;

export const selectVoteStatus = (state: RootState) => state.vote.isActive;

export const selectVoteVictim = (state: RootState) => state.vote.victim;

export const selectUserOpenedVote = (state: RootState) => state.vote.userOpenedVote;

export const selectScoreValues = (state: RootState) => state.gameSettings.scoreValues;

export const selectSettings = (state: RootState) => state.gameSettings;

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

export const selectPlayersIds = createSelector([selectUsers], users => {
  const players = users.filter(user => user.role === USER_ROLES.PLAYER);
  return players.map(player => player.id);
});

export const selectPlayersAndDealerIds = createSelector([selectUsers], users => {
  const players = users.filter(user => user.role === USER_ROLES.DEALER || user.role === USER_ROLES.PLAYER);
  return players.map(player => player.id);
});

export const selectDoneIssues = createSelector([selectIssues], issues => {
  return issues.filter(issue => issue.done === true);
});

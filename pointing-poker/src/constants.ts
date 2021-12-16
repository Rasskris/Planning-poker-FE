import type { ToastOptions } from 'react-toastify';

export const URL = 'http://localhost:5000';

export const FETCH_ERROR = 'Fetch failed';

export const VOTE_AVAILIBLE_TEXT = 'Vote open. This user must be deleted if more 50% members vote for kick user.';

export const VOTE_NOT_AVAILIBLE_TEXT =
  "Sorry, you can't open vote, because in this game less 3 members (not including dealer).";

export const SCORE_VALUES_FN: Array<string> = ['1', '2', '3', '5', '8', 'coffee', 'unknown'];

export const SCORE_VALUES_PT: Array<string> = ['1', '2', '4', '8', '16', 'coffee', 'unknown'];

export const SCORE_TYPE_SHORT_FN = 'FN';

export const SCORE_TYPE_SHORT_PT = 'PT';

export const VALUE_COFFE = 'coffee';

export const VALUE_UNKNOWN = 'unknown';

export const PENDING_MESSAGE = 'Pending access admit to game from dealer...';

export const WAITING_LIST_TITLE = 'Newcomer waiting list:';

export const WAITING_LIST_TEXT = 'Should this user to admit to game?';

export const NEWCOMER_LIST_EMPTY = 'Now list is empty...';

export const REJECTED_TO_GAME_TEXT = 'Sorry, you cannot access the game because the dealer denied your request.';

export const REDIRECT_TO_MAIN_TEXT = 'Maybe you want to go back to main page?';

export const TOOLTIP_TEXT = 'Please, select current issue';

export const MEMBER_ISSUE_TEXT = "Dealer doesn't yet created issues";

export const DEALER_ISSUE_TEXT = 'You and other members can see issues here after creating them';

export const TOAST_OPTIONS: ToastOptions = {
  position: 'top-center',
  theme: 'dark',
  style: { fontSize: '16px' },
};

export const USER_GREETING_TEXT = 'Welcome to Planning Poker!';

export const USER_LEAVING__TEXT = 'GoodBye! See you soon!';

export const MEMBER_JOINED_TEXT = 'New member joined to game';

export const MEMBER_LEFT_TEXT = 'Member left this game';

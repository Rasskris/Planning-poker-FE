export const URL = 'http://localhost:5000';

export const FETCH_ERROR = 'Fetch failed';

export const VOTE_AVAILIBLE_TEXT = 'Vote open. This user must be deleted if more 50% members vote for kick user.';

export const VOTE_NOT_AVAILIBLE_TEXT = "Sorry, you can't open vote, because in this game less 3 members.";

export const SCORE_VALUES_FN: Array<string> = ['1', '2', '3', '5', '8', 'coffe', 'unknown'];

export const SCORE_VALUES_PT: Array<string> = ['1', '2', '4', '8', '16', 'coffe', 'unknown'];

export const SCORE_TYPE_SHORT_FN = 'FN';

export const SCORE_TYPE_SHORT_PT = 'PT';

export const VALUE_COFFE = 'coffe';

export enum USER_ROLES {
  PLAYER = 'player',
  DEALER = 'dealer',
  OBSERVER = 'observer',
}

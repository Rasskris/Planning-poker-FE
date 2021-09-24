export const URL = 'http://localhost:5000';

export const FETCH_ERROR = 'Fetch failed';

export const VOTE_AVAILIBLE_TEXT = 'Vote open. This user must be deleted if more 50% members vote for kick user.';

export const VOTE_NOT_AVAILIBLE_TEXT = "Sorry, you can't open vote, because in this game less 3 members.";

export enum USER_ROLES {
  PLAYER = 'player',
  DEALER = 'dealer',
  OBSERVER = 'observer',
}

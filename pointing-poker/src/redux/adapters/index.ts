import { createEntityAdapter } from '@reduxjs/toolkit';
import { Issue, Message, User } from '../../interfaces';

export const issuesAdapter = createEntityAdapter<Issue>({
  selectId: issue => issue.id!,
});

export const messagesAdapter = createEntityAdapter<Message>({
  selectId: message => message.id!,
});

export const usersAdapter = createEntityAdapter<User>({
  selectId: user => user.id!,
});

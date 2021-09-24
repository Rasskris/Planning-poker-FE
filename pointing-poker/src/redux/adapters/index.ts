import { createEntityAdapter } from '@reduxjs/toolkit';
import { Issue, IMessage, IUser } from '../../interfaces';

export const issuesAdapter = createEntityAdapter<Issue>({
  selectId: issue => issue.id!,
});

export const messagesAdapter = createEntityAdapter<IMessage>({
  selectId: message => message.id!,
});

export const usersAdapter = createEntityAdapter<IUser>({
  selectId: user => user.id!,
});

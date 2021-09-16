import { Dispatch } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import { addMessage, addIssue, deleteIssue, editIssue } from '../redux/thunks';
import { URL } from '../constants';

export const initSocket = (userId: string, gameId: string, dispatch: Dispatch): Socket => {
  const socket = io(URL, {
    transports: ['websocket', 'polling'],
    auth: {
      userId,
    },
  });

  socket.emit('joinToRoom', gameId);

  socket.on('connect', () => {
    console.log(`socket connected: ${socket.id}`);
  });

  socket.on('message', ({ message }) => {
    dispatch({ type: addMessage.fulfilled.type, payload: message });
  });

  socket.on('issue', ({ issue }) => {
    dispatch({ type: addIssue.fulfilled.type, payload: issue });
  });

  socket.on('issueEdit', ({ issue }) => {
    dispatch({ type: editIssue.fulfilled.type, payload: issue });
  });

  socket.on('issueDelete', ({ issueId }) => {
    dispatch({ type: deleteIssue.fulfilled.type, payload: issueId });
  });

  socket.on('disconnect', reason => {
    console.log(`socked disconnected: ${reason}`);
  });

  return socket;
};

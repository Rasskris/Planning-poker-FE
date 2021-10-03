import { Dispatch } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import {
  addMessage,
  addIssue,
  updateCurrentIssue,
  deleteIssue,
  deleteUser,
  updateGameStatus,
  updateUser,
  updateGameSettings,
  updateRoundStatus,
  updateDoneIssue,
} from '../redux/thunks';
import {
  enableVote,
  memberJoin,
  addNewComer,
  admitToGame,
  rejectToGame,
  updateTimer,
  resetSelectedCards,
} from '../redux/slices';
import { URL } from '../constants';
import { logout } from '../redux/actions';

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

  socket.on('memberJoin', user => {
    dispatch(memberJoin(user));
  });

  socket.on('memberLeave', deletedUserId => {
    if (userId === deletedUserId) {
      dispatch(logout());
    } else {
      dispatch({ type: deleteUser.fulfilled.type, payload: deletedUserId });
    }
  });

  socket.on('userUpdate', user => {
    dispatch({ type: updateUser.fulfilled.type, payload: user });
  });

  socket.on('message', message => {
    dispatch({ type: addMessage.fulfilled.type, payload: message });
  });

  socket.on('issueAdd', issue => {
    dispatch({ type: addIssue.fulfilled.type, payload: issue });
  });

  socket.on('issueListUpdate', issues => {
    dispatch({ type: updateCurrentIssue.fulfilled.type, payload: issues });
  });

  socket.on('issueUpdate', issue => {
    dispatch({ type: updateDoneIssue.fulfilled.type, payload: issue });
  });

  socket.on('issueDelete', issueId => {
    dispatch({ type: deleteIssue.fulfilled.type, payload: issueId });
  });

  socket.on('vote', ({ victim, currentUserId }) => {
    if (victim.id !== userId) {
      dispatch(enableVote({ victim, currentUserId }));
    }
  });

  socket.on('gameStatus', status => {
    dispatch({ type: updateGameStatus.fulfilled.type, payload: status });
  });

  socket.on('gameSettings', gameSettings => {
    dispatch({ type: updateGameSettings.fulfilled.type, payload: gameSettings });
  });

  socket.on('notifyDealer', user => {
    dispatch(addNewComer(user));
  });

  socket.on('admitToGame', () => {
    dispatch(admitToGame());
    dispatch({ type: updateGameStatus.fulfilled.type, payload: true });
  });

  socket.on('rejectToGame', () => {
    dispatch(rejectToGame());
  });

  socket.on('cancelGame', () => {
    dispatch(logout());
  });

  socket.on('roundStatus', status => {
    console.log('soket', status);
    dispatch({ type: updateRoundStatus.fulfilled.type, payload: status });
  });

  socket.on('timer', timer => {
    dispatch(updateTimer(timer));
  });

  socket.on('resetSelectedCard', scoreType => {
    dispatch(resetSelectedCards(scoreType));
  });

  socket.on('disconnect', reason => {
    console.log(`socked disconnected: ${reason}`);
  });
  return socket;
};

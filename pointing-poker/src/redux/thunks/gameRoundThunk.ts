import { createAsyncThunk } from '@reduxjs/toolkit';
import { IObjectType } from '../../interfaces/IObjectType';
import { clientAPI } from '../../libs';

interface IAddGameRoundData {
  gameId: string;
  userId: string;
  currentIssue: string;
  playerCards: string[];
  scoreTypeValue: string;
}

interface IUpdateUserGameCard {
  gameId: string;
  currentIssue: string;
  valueSelectedGameCard: string;
  userId: string;
}

interface IUpdateGameRoundStatistics {
  gameId: string;
  userId: string;
  roundStatistics: IObjectType;
  currentIssue: string;
}

interface IDeleteGameRoundData {
  gameId: string;
  userId: string;
  currentIssue: string;
}

interface IResetGameRoundData {
  gameId: string;
  userId: string;
}

// add data to the server. After processing, the server sends a response with the round data and starts the round
export const addGameRoundData = createAsyncThunk(
  'gameRound/addGameRoundData',
  async ({ gameId, currentIssue, playerCards, scoreTypeValue, userId }: IAddGameRoundData) => {
    const data = await clientAPI.post(`/api/gameround/${gameId}`, {
      scoreTypeValue,
      currentIssue,
      playerCards,
      userId,
    });
    return data;
  },
);

export const updateUserGameCard = createAsyncThunk(
  'gameRound/updateUserGameCard',
  async ({ currentIssue, gameId, userId, valueSelectedGameCard }: IUpdateUserGameCard) => {
    const data = await clientAPI.put(`/api/gameround/usersUpdate/${gameId}`, {
      currentIssue,
      valueSelectedGameCard,
      userId,
    });
    return data;
  },
);

// get data of all rounds of the current game
export const getDataAllRoundsOfGame = createAsyncThunk('gameRound/getDataAllRoundsOfGame', async (gameId: string) => {
  const data = await clientAPI.get(`/api/gameround/${gameId}`);
  return data;
});

//writing the results of round statistics to the server
export const updateGameRoundStatistics = createAsyncThunk(
  'gameRound/updateGameRoundStatistics',
  async ({ gameId, userId, roundStatistics, currentIssue }: IUpdateGameRoundStatistics) => {
    const data = await clientAPI.put(`/api/gameround/roundStatistics/${gameId}`, {
      roundStatistics,
      userId,
      currentIssue,
    });
    return data;
  },
);

export const deleteGameRoundData = createAsyncThunk(
  'gameRound/deleteGameRoundData',
  async ({ gameId, userId, currentIssue }: IDeleteGameRoundData) => {
    const data = await clientAPI.delete(`/api/gameround/${gameId}`, {
      userId,
      currentIssue,
    });
    return data;
  },
);

export const resetGameRoundDataThunk = createAsyncThunk(
  'gameRound/resetGameRoundDataThunk',
  async ({ gameId, userId }: IResetGameRoundData) => {
    const data = await clientAPI.delete(`/api/gameround/reset/${gameId}`, { userId });
    return data;
  },
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGameRoundData } from '../../interfaces';
import { clientAPI } from '../../libs';

interface IAddGameRoundData {
  gameId: string;
  userId: string;
  currentIssue: string;
  playerCards: string[];
}

interface IUpdateUserGameCard {
  gameId: string;
  gameRoundData: IGameRoundData;
  valueSelectedGameCard: string;
  userId: string;
}

interface IUpdateGameRoundStatistics {
  gameId: string;
  gameRoundData: IGameRoundData;
  userId: string;
}

interface IGetRoundStatistic {
  gameId: string;
  userId: string;
  currentIssue: string;
}

// add data to the server. After processing, the server sends a response with the round data and starts the round
export const addGameRoundData = createAsyncThunk(
  'gameRound/addGameRoundData',
  async ({ gameId, currentIssue, playerCards, userId }: IAddGameRoundData) => {
    const data = await clientAPI.post(`/api/gameround/${gameId}`, { currentIssue, playerCards, userId });
    return data;
  },
);

export const updateUserGameCard = createAsyncThunk(
  'gameRound/updateUserGameCard',
  async ({ gameRoundData, gameId, userId, valueSelectedGameCard }: IUpdateUserGameCard) => {
    const data = await clientAPI.put(`/api/gameround/usersUpdate/${gameId}`, {
      gameRoundData,
      valueSelectedGameCard,
      userId,
    });
    return data;
  },
);

// get data of all rooms of the current game
export const getDataAllRoomsOfGame = createAsyncThunk('gameRound/getDataAllRoomsOfGame', async (gameId: string) => {
  const data = await clientAPI.get(`/api/gameround/${gameId}`);
  return data;
});

//writing the results of round statistics to the server
export const updateGameRoundStatistics = createAsyncThunk(
  'gameRound/updateGameRoundStatistics',
  async ({ gameId, gameRoundData, userId }: IUpdateGameRoundStatistics) => {
    const data = await clientAPI.put(`/api/gameround/roundStatistics/${gameId}`, { gameRoundData, userId });
    return data;
  },
);

export const getRoundStatistic = createAsyncThunk(
  'gameRound/getRoundStatistic',
  async ({ gameId, currentIssue, userId }: IGetRoundStatistic) => {
    const data = await clientAPI.get(`/api/gameround/roundStatistics/${gameId}`, { currentIssue, userId });
    return data;
  },
);

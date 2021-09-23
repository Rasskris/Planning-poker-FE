import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGameRoundData } from '../../interfaces';
import { clientAPI } from '../../libs';

interface IAddGameRoundData {
  gameId: string;
  userId: string;
  gameRoundData: IGameRoundData;
  currentIssue: string;
  playerCards: string[];
}

interface IUpdateUserGameCard {
  gameId: string;
  gameRoundData: IGameRoundData;
  valueSelectedGameCard: string;
  userId: string;
}

//добавляет данные на сервер после обработки сервер присылается ответ с данными раунда и он стартует
export const addGameRoundData = createAsyncThunk(
  'gameRound/addGameRoundData',
  async ({ gameRoundData, gameId, currentIssue, playerCards, userId }: IAddGameRoundData) => {
    const data = await clientAPI.post(`/api/gameround/${gameId}`, { gameRoundData, currentIssue, playerCards, userId });
    return data;
  },
);

//обновлет данные раунда на сервере добавляя к ним значение карты игрока, и возвращается обновленые данные всем остальным
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

// получить данные всех комнат текущей игры
export const getDataAllRoomsOfGame = createAsyncThunk('gameRound/getDataAllRoomsOfGame', async (gameId: string) => {
  const data = await clientAPI.get(`/api/gameround/${gameId}`);
  console.log(data);
  return data;
});

import { SCORE_VALUES_FN, SCORE_VALUES_PT, VALUE_UNKNOWN } from '../constants';
import type { Statistics, MapScoreValues } from '../types';
import { User } from '../interfaces';

const mapScoreValues: MapScoreValues = {
  FN: SCORE_VALUES_FN,
  PT: SCORE_VALUES_PT,
};

const getPersent = (countPlayes: number, countCards: number) => (countCards / countPlayes) * 100;

const getAllSelectedCards = (players: User[]) =>
  players.map(player => (player.selectedCard ? player.selectedCard.scoreValue : VALUE_UNKNOWN));

export const getStatistics = (scoreType: string, players: User[], countPlayes: number) => {
  const statistics: Statistics = {};
  const scoreValues = mapScoreValues[scoreType];
  const allSelectedCards = getAllSelectedCards(players);

  scoreValues.forEach(scoreValue => {
    allSelectedCards.forEach(value => {
      if (scoreValue === value) {
        statistics[scoreValue] ? (statistics[scoreValue] += 1) : (statistics[scoreValue] = 1);
      }
    });
  });

  const result = Object.entries(statistics).map(([scoreValue, countCards]) => {
    const percent = getPersent(countPlayes, countCards);

    return { scoreType, scoreValue, percent };
  });

  return result;
};

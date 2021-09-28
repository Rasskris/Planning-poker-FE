import { IObjectType } from '../interfaces/IObjectType';

interface IRoundStatiscticsCalculationProps {
  playerCards: IObjectType;
}

export const roundStatiscticsCalculation = ({ playerCards }: IRoundStatiscticsCalculationProps) => {
  let roundStatisticsMap: Map<string | null, number> = new Map(); // key: score Card Value, value: number of identical cards
  let numberPlayersOfRound = 0;
  for (let key in playerCards) {
    numberPlayersOfRound += 1;
    let scoreCardValue = playerCards[key] ? playerCards[key] : 'unknown';
    let numberOfIdenticalCards = roundStatisticsMap.get(scoreCardValue);
    if (numberOfIdenticalCards) {
      roundStatisticsMap.set(scoreCardValue, numberOfIdenticalCards + 1);
    } else {
      roundStatisticsMap.set(scoreCardValue, 1);
    }
  }

  for (let key of roundStatisticsMap.keys() as any) {
    let numberOfIdenticalCards = roundStatisticsMap.get(key);
    if (numberOfIdenticalCards) {
      let percentageValue = (numberOfIdenticalCards * 100) / numberPlayersOfRound;
      roundStatisticsMap.set(key, percentageValue);
    }
    return Object.fromEntries(roundStatisticsMap);
  }
};

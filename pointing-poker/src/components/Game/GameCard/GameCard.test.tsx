import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GameCard } from '../GameCard';

describe('GameCard', () => {
  const handleSelectCurrentCard = jest.fn();

  test('should render component with current props', () => {
    const { getByTestId } = render(<GameCard isCurrent={false} scoreType="sp" scoreValue="8" />);

    expect(getByTestId(/topCard/)).toHaveTextContent('8');
    expect(getByTestId(/centerCard/)).toHaveTextContent('sp');
    expect(getByTestId(/bottomCard/)).toHaveTextContent('8');
  });

  test('should calls the handleEditScoreValue', () => {
    const { getByRole } = render(
      <GameCard isCurrent={false} scoreType="sp" scoreValue="8" onSelectCurrentCard={handleSelectCurrentCard} />,
    );
    const button = getByRole('button');

    userEvent.click(button);
    expect(handleSelectCurrentCard).toHaveBeenCalledTimes(1);

    userEvent.click(button);
    expect(handleSelectCurrentCard).toHaveBeenCalledTimes(2);
  });
});

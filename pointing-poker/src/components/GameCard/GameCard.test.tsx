import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GameCard } from '..';

describe('GameCard', () => {
  const handleEditScoreValue = jest.fn();

  test('should render component with current props', () => {
    const { getByTestId } = render(<GameCard scoreType="sp" scoreValue={8} />);

    expect(getByTestId(/topCard/)).toHaveTextContent('8');
    expect(getByTestId(/centerCard/)).toHaveTextContent('sp');
    expect(getByTestId(/bottomCard/)).toHaveTextContent('8');
  });

  test('should calls the handleEditScoreValue', () => {
    const { getByRole } = render(
      <GameCard scoreType="sp" scoreValue={8} handleEditScoreValue={handleEditScoreValue} />,
    );
    const button = getByRole('button');

    userEvent.click(button);
    expect(handleEditScoreValue).toHaveBeenCalledTimes(1);

    userEvent.click(button);
    expect(handleEditScoreValue).toHaveBeenCalledTimes(2);
  });
});

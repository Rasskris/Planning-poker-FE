import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserCard } from '..';

const firstName = 'Joy';
const lastName = 'Doy';
const jobPosition = 'junior';

describe('IssueCard', () => {
  const handleKickUser = jest.fn();

  test('should render with current props', () => {
    const { getByText } = render(<UserCard firstName={firstName} lastName={lastName} jobPosition={jobPosition} />);

    expect(getByText(/joy/i)).toBeInTheDocument();
    expect(getByText(/doy/i)).toBeInTheDocument();
    expect(getByText(/junior/i)).toBeInTheDocument();
  });

  test('should render the correct initials of name', () => {
    const { getByTestId } = render(<UserCard firstName={firstName} lastName={lastName} />);

    expect(getByTestId(/initialsName/)).toHaveTextContent(/jd/i);
  });

  test('should show that this is the current user', () => {
    const { getByText } = render(<UserCard firstName={firstName} isCurrentUser={true} />);

    expect(getByText(/it's you/i)).toBeInTheDocument();
  });

  test('should show that this is not the current user', () => {
    const { queryByText } = render(<UserCard firstName={firstName} />);

    expect(queryByText(/it's you/)).toBe(null);
  });

  test('should calls handleKickUser', () => {
    const { getByRole } = render(<UserCard firstName={firstName} handleKickUser={handleKickUser} />);
    const btnKick = getByRole('button');

    userEvent.click(btnKick);

    expect(handleKickUser).toHaveBeenCalledTimes(1);
  });
});

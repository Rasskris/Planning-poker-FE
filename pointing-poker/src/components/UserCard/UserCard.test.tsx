import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserCard } from '..';

const FIRST_NAME = 'Joy';
const LAST_NAME = 'Doy';
const JOB_POSITION = 'junior';

describe('IssueCard', () => {
  const handleKickUser = jest.fn();

  test('should render with current props', () => {
    const { getByText } = render(<UserCard firstName={FIRST_NAME} lastName={LAST_NAME} jobPosition={JOB_POSITION} />);

    expect(getByText(/joy/i)).toBeInTheDocument();
    expect(getByText(/doy/i)).toBeInTheDocument();
    expect(getByText(/junior/i)).toBeInTheDocument();
  });

  test('should render the correct initials of name', () => {
    const { getByTestId } = render(<UserCard firstName={FIRST_NAME} lastName={LAST_NAME} />);

    expect(getByTestId(/initialsName/)).toHaveTextContent(/jd/i);
  });

  test('should show that this is the current user', () => {
    const { getByText } = render(<UserCard firstName={FIRST_NAME} isCurrentUser={true} />);

    expect(getByText(/it's you/i)).toBeInTheDocument();
  });

  test('should show that this is not the current user', () => {
    const { queryByText } = render(<UserCard firstName={FIRST_NAME} />);

    expect(queryByText(/it's you/)).toBe(null);
  });

  test('should calls handleKickUser', () => {
    const { getByRole } = render(<UserCard firstName={FIRST_NAME} handleKickUser={handleKickUser} />);
    const btnKick = getByRole('button');

    userEvent.click(btnKick);

    expect(handleKickUser).toHaveBeenCalledTimes(1);
  });
});

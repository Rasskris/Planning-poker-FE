import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserCard } from '..';

const FIRST_NAME = 'Joy';
const LAST_NAME = 'Doy';
const JOB_POSITION = 'junior';
const ID = '434jjnc3jdj';
const CURRENT_USER_ID = '4878dfcjdhjh';
const CURRENT_USER_WITH_SAME_ID = '434jjnc3jdj';
const ROLE = 'OBSERVER';

const renderComponent = (currentUserId: string) => {
  const handleKickUser = jest.fn();
  const utils = render(
    <UserCard
      id={ID}
      currentUserId={currentUserId}
      firstName={FIRST_NAME}
      lastName={LAST_NAME}
      jobPosition={JOB_POSITION}
      handleKickUser={handleKickUser}
      role={ROLE}
    />,
  );

  return {
    handleKickUser,
    ...utils,
  };
};

describe('IssueCard', () => {
  test('should render with current props', () => {
    const { getByText } = renderComponent(CURRENT_USER_ID);

    expect(getByText(/joy/i)).toBeInTheDocument();
    expect(getByText(/doy/i)).toBeInTheDocument();
    expect(getByText(/junior/i)).toBeInTheDocument();
  });

  test('should render the correct initials of name', () => {
    const { getByTestId } = renderComponent(CURRENT_USER_ID);

    expect(getByTestId(/initialsName/)).toHaveTextContent(/jd/i);
  });

  test('should show that this is the current user', () => {
    const { getByText } = renderComponent(CURRENT_USER_WITH_SAME_ID);

    expect(getByText(/it's you/i)).toBeInTheDocument();
  });

  test('should show that this is not the current user', () => {
    const { queryByText } = renderComponent(CURRENT_USER_ID);

    expect(queryByText(/it's you/)).toBe(null);
  });

  test('should calls handleKickUser', () => {
    const { getByRole, handleKickUser } = renderComponent(CURRENT_USER_ID);
    const btnKick = getByRole('button');

    userEvent.click(btnKick);

    expect(handleKickUser).toHaveBeenCalledTimes(1);
  });
});

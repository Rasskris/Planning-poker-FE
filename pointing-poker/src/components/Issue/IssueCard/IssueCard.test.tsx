import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IssueCard } from '../IssueCard';

const ISSUE_NAME = 'Issue 345';
const ISSUE_PRIORITY = 'Low';
const ID = '7643nb43843';
const GAME_ID = '34hb324j';
const CREATOR_ID = '79c74hb324j';
const DEALER_TRUE = true;
const DEALER_FALSE = false;
const CURRENT_ISSUE_FALSE = false;
const CURRENT_ISSUE_TRUE = true;
const IS_DONE = false;

const renderComponent = (isDealer: boolean, isCurrent: boolean) => {
  const handleRemoveIssue = jest.fn();
  const handleSelectCurrentIssue = jest.fn();

  const utils = render(
    <IssueCard
      id={ID}
      gameId={GAME_ID}
      isDone={IS_DONE}
      creatorId={CREATOR_ID}
      isCurrent={isCurrent}
      title={ISSUE_NAME}
      priority={ISSUE_PRIORITY}
      isDealer={isDealer}
      handleRemoveIssue={handleRemoveIssue}
      handleSelectCurrentIssue={handleSelectCurrentIssue}
    />,
  );

  return {
    handleRemoveIssue,
    ...utils,
  };
};

describe('IssueCard', () => {
  test('should render with current props', () => {
    const { getByText } = renderComponent(DEALER_TRUE, CURRENT_ISSUE_FALSE);

    expect(getByText(/issue 345/i)).toBeInTheDocument();
    expect(getByText(/low/i)).toBeInTheDocument();
  });

  test('should show that this is the current issue', () => {
    const { getByText } = renderComponent(DEALER_TRUE, CURRENT_ISSUE_TRUE);

    expect(getByText(/current/)).toBeInTheDocument();
  });

  test('should show that this is not the current issue', () => {
    const { queryByText } = renderComponent(DEALER_TRUE, CURRENT_ISSUE_FALSE);

    expect(queryByText(/current/)).toBe(null);
  });

  test('should render delete button', () => {
    const { getByRole } = renderComponent(DEALER_TRUE, CURRENT_ISSUE_FALSE);

    expect(getByRole('button')).toBeInTheDocument();
  });

  test('should not render delete button', () => {
    const { queryByRole } = renderComponent(DEALER_FALSE, CURRENT_ISSUE_FALSE);

    expect(queryByRole('button')).toBe(null);
  });

  test('should calls handleEditIssue and handleRemoveIssue', () => {
    const { getByTestId, handleRemoveIssue } = renderComponent(DEALER_TRUE, CURRENT_ISSUE_FALSE);

    const btnRemove = getByTestId(/btnRemove/);

    userEvent.click(btnRemove);

    expect(handleRemoveIssue).toHaveBeenCalledTimes(1);
  });
});

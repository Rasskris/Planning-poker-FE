import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IssueCard } from '..';

const ISSUE_NAME = 'Issue 345';
const ISSUE_PRIORITY = 'Low';
const ID = '7643nb43843';
const IS_DEALER_TRUE = true;
const IS_DEALER_FALSE = false;

const renderComponent = (isDealer: boolean, isCurrentIssue?: boolean) => {
  const handleRemoveIssue = jest.fn();
  const utils = render(
    <IssueCard
      id={ID}
      isCurrentIssue={isCurrentIssue}
      title={ISSUE_NAME}
      priority={ISSUE_PRIORITY}
      isDealer={isDealer}
      handleRemoveIssue={handleRemoveIssue}
    />,
  );

  return {
    handleRemoveIssue,
    ...utils,
  };
};

describe('IssueCard', () => {
  test('should render with current props', () => {
    const { getByText } = renderComponent(IS_DEALER_TRUE);

    expect(getByText(/issue 345/i)).toBeInTheDocument();
    expect(getByText(/low/i)).toBeInTheDocument();
  });

  test('should show that this is the current issue', () => {
    const isCurrentIssue = true;
    const { getByText } = renderComponent(IS_DEALER_TRUE, isCurrentIssue);

    expect(getByText(/current/)).toBeInTheDocument();
  });

  test('should show that this is not the current issue', () => {
    const { queryByText } = renderComponent(IS_DEALER_TRUE);

    expect(queryByText(/current/)).toBe(null);
  });

  test('should render delete button', () => {
    const { getByRole } = renderComponent(IS_DEALER_TRUE);

    expect(getByRole('button')).toBeInTheDocument();
  });

  test('should not render delete button', () => {
    const { queryByRole } = renderComponent(IS_DEALER_FALSE);

    expect(queryByRole('button')).toBe(null);
  });

  test('should calls handleEditIssue and handleRemoveIssue', () => {
    const { getByTestId, handleRemoveIssue } = renderComponent(IS_DEALER_TRUE);

    const btnRemove = getByTestId(/btnRemove/);

    userEvent.click(btnRemove);

    expect(handleRemoveIssue).toHaveBeenCalledTimes(1);
  });
});

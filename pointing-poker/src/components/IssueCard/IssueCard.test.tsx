import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IssueCard } from '..';

const issueName = 'Issue 345';
const issuePriority = 'Low';

describe('IssueCard', () => {
  const handleEditIssue = jest.fn();
  const handleRemoveIssue = jest.fn();

  test('should render with current props', () => {
    const { getByTestId } = render(<IssueCard issueName={issueName} issuePriority={issuePriority} />);

    expect(getByTestId(/issueName/)).toHaveTextContent(/issue 345/i);
    expect(getByTestId(/issuePriority/)).toHaveTextContent(/low/i);
  });

  test('should show that this is the current issue', () => {
    const { getByText } = render(
      <IssueCard isCurrentIssue={true} issueName={issueName} issuePriority={issuePriority} />,
    );

    expect(getByText(/current/)).toBeInTheDocument();
  });

  test('should show that this is not the current issue', () => {
    const { queryByText } = render(<IssueCard issueName={issueName} issuePriority={issuePriority} />);

    expect(queryByText(/current/)).toBe(null);
  });

  test('should calls handleEditIssue and handleRemoveIssue', () => {
    const { getByTestId } = render(
      <IssueCard
        issueName={issueName}
        issuePriority={issuePriority}
        handleEditIssue={handleEditIssue}
        handleRemoveIssue={handleRemoveIssue}
      />,
    );

    const btnEdit = getByTestId(/btnEdit/);
    const btnRemove = getByTestId(/btnRemove/);

    userEvent.click(btnEdit);
    userEvent.click(btnRemove);

    expect(handleEditIssue).toHaveBeenCalledTimes(1);
    expect(handleRemoveIssue).toHaveBeenCalledTimes(1);
  });
});

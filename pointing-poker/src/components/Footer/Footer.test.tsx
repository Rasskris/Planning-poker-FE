import { render } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders copyright block', () => {
    const { getByText } = render(<Footer />);
    const copyrightElement = getByText(/made by/i);

    expect(copyrightElement).toBeInTheDocument();
    expect(copyrightElement.childElementCount).toBe(3);
  });
});

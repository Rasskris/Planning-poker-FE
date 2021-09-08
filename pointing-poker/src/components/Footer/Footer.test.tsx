import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import classes from './Footer.module.scss';

describe('Footer', () => {
  it('renders logo block', () => {
    const { container } = render(<a className={classes.logo} href={'https://rs.school/react/'} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders copyright block', () => {
    const { getByText } = render(<Footer />);
    const copyrightElement = getByText(/made by/i);
    expect(copyrightElement).toBeInTheDocument();
    expect(copyrightElement.childElementCount).toBe(3);
  });
});

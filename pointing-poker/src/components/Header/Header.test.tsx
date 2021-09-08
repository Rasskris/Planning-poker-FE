import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import classes from '../Footer/Footer.module.scss';

describe('Header', () => {
  it('renders Header component', () => {
    render(<Header />);
    screen.debug();
  });

  it('renders logo block', () => {
    const { container } = render(<div className={classes.logo} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders header background', () => {
    const { container } = render(<div className={classes.background} />);
    expect(container).toBeInTheDocument();
    expect(container.children.length).toBe(1);
  });
});

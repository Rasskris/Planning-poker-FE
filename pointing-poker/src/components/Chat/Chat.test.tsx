import React from 'react';
import { render, screen } from '@testing-library/react';
import Chat from './Chat';

describe('Chat', () => {
  it('renders Chat component', () => {
    render(<Chat />);
    screen.debug();
  });
});

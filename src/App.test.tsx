import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App main heading', () => {
  render(<App />);
  const mainHeading = screen.getByText(/grocery list/i);
  expect(mainHeading).toBeInTheDocument();
});

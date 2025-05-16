import React from 'react'                  // optional with modern JSX
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'          // pulls in matchers
import TopPerformersTable from '../../components/TopPerformersTable';

test('renders top performers table with data', () => {
  const data = [
    { symbol: 'AAPL', change: '+5.00%', direction: 'gain' },
    { symbol: 'TSLA', change: '-2.00%', direction: 'loss' }
  ];
  render(<TopPerformersTable data={data} period="monthly" />);

  expect(screen.getByText(/top performers \(monthly\)/i)).toBeInTheDocument();
  expect(screen.getByText('AAPL')).toBeInTheDocument();
  expect(screen.getByText('TSLA')).toBeInTheDocument();
});
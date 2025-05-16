import React from 'react'                  // optional with modern JSX
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'          // pulls in matchers
import HistoricalChart from '../../components/HistoricalChart';

test('renders HistoricalChart if data is present', () => {
  const data = [
    { date: '2025-05-01', close: 123.45 },
    { date: '2025-05-02', close: 125.67 }
  ];
  render(<HistoricalChart data={data} symbol="AAPL" />);
  expect(screen.getByText(/aapl 5-day trend/i)).toBeInTheDocument();
});
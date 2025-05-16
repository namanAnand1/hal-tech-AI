import React from 'react'                  // optional with modern JSX
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'          // pulls in matchers
import StockPriceBox from '../../components/StockPriceBox';

test('displays loading state', () => {
  render(<StockPriceBox loading={true} />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('displays error message', () => {
  render(<StockPriceBox error="Failed to load" loading={false} />);
  expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
});

test('displays stock price and symbol', () => {
  render(<StockPriceBox price={150.25} symbol="MSFT" loading={false} />);
  expect(screen.getByText(/current msft stock price/i)).toBeInTheDocument();
  expect(screen.getByText("$150.25")).toBeInTheDocument();
});
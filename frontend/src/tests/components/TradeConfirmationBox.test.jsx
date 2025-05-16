// ✅ TradeConfirmationBox.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import TradeConfirmationBox from '../../components/TradeConfirmationBox';
import React from 'react'                  // optional with modern JSX
import '@testing-library/jest-dom'          // pulls in matchers
const mockData = {
  message: "Buy order placed for 10 share(s) of AAPL.\nEstimated price per share: $145.32\nEstimated total: $1453.20",
  filled_qty: "10",
  order_id: "ORDER-123456"
};

test('renders loading state', () => {
  render(<TradeConfirmationBox loading={true} />);
  expect(screen.getByText(/processing trade/i)).toBeInTheDocument();
});

test('renders error message', () => {
  render(<TradeConfirmationBox error="Trade failed" />);
  expect(screen.getByText(/trade failed/i)).toBeInTheDocument();
});

test('renders trade details and toggles order ID', () => {
  render(<TradeConfirmationBox data={mockData} />);

  expect(screen.getByText(/buy order placed/i)).toBeInTheDocument();
  expect(screen.getByText(/shares filled: 10/i)).toBeInTheDocument();

  const toggleBtn = screen.getByRole('button', { name: /view order id/i });
  fireEvent.click(toggleBtn);
  expect(screen.getByText(/order-123456/i)).toBeInTheDocument();

  fireEvent.click(toggleBtn);
  expect(screen.queryByText(/order-123456/i)).not.toBeInTheDocument();
});

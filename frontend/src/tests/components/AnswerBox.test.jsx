import React from 'react'                  // optional with modern JSX
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'          // pulls in matchers
import AnswerBox from '../../components/AnswerBox';

test('displays error if error is provided', () => {
  render(<AnswerBox error="Test error" />);
  expect(screen.getByText(/test error/i)).toBeInTheDocument();
});

test('displays answer if provided', () => {
  render(<AnswerBox answer="This is the full response" />);
  expect(screen.getByText(/this is the full response/i)).toBeInTheDocument();
});

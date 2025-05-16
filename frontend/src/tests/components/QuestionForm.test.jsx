import React from 'react'                  // optional with modern JSX
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'          // pulls in matchers
import QuestionForm from '../../components/QuestionForm';

test('renders input and buttons', () => {
  render(
    <QuestionForm
      question=""
      setQuestion={() => {}}
      handleSubmit={() => {}}
      loading={false}
    />
  );

  expect(screen.getByPlaceholderText(/ask a question/i)).toBeInTheDocument();
  expect(screen.getByText(/ask/i)).toBeInTheDocument();
  expect(screen.getByTitle(/use voice/i)).toBeInTheDocument();
});

test('disables input and buttons when loading', () => {
  render(
    <QuestionForm
      question=""
      setQuestion={() => {}}
      handleSubmit={() => {}}
      loading={true}
    />
  );

  expect(screen.getByPlaceholderText(/ask a question/i)).toBeDisabled();
  expect(screen.getByText(/asking/i)).toBeDisabled();
});

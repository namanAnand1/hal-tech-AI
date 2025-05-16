import React from 'react'                  // optional with modern JSX
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'          // pulls in matchers
import ExpandableAnswer from '../../components/ExpandableAnswer';

test('renders full text if under 50 words', () => {
  const text = 'This is a short answer.';
  render(<ExpandableAnswer text={text} />);
  expect(screen.getByText(text)).toBeInTheDocument();
});

test('renders truncated preview with Read More button if over 50 words', () => {
  const longText = Array(60).fill('word').join(' ');
  render(<ExpandableAnswer text={longText} />);

  expect(screen.getByText(/read more/i)).toBeInTheDocument();
  expect(screen.getByText(/word word word/i)).toBeInTheDocument();
});

test('expands and collapses text on button click', () => {
  const longText = Array(60).fill('expand').join(' ');
  render(<ExpandableAnswer text={longText} />);

  const toggleBtn = screen.getByText(/read more/i);
  fireEvent.click(toggleBtn);
  expect(screen.getByText(/show less/i)).toBeInTheDocument();
});

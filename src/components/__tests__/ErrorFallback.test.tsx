import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ErrorFallback } from '../ErrorFallback';

it('gives error', () => {
  render(
    <ErrorFallback error='test error' />
  )
  expect(screen.getByText('test error')).toBeTruthy()
})

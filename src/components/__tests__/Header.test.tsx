import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Header } from './../Header';
import { screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect'

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => null)
    },
    writable: true
  });
})

test('login button render', async () => {
  render(
    <MemoryRouter initialEntries={['/welcome']}>
      <Header />
    </MemoryRouter>
  )
  expect(screen.getByRole('link', { name: /login/i }))
    .toHaveTextContent('Login')
})

test('page navigation buttons render', async () => {
  window.localStorage.getItem = jest.fn(() => 'test')

  render(
    <MemoryRouter initialEntries={['/welcome', '/']}>
      <Header />
    </MemoryRouter>
  )

  const logoutButton = screen.getByRole('link', { name: /logout/i })
  const addEntryButton = screen.getByRole('link', { name: /add entry/i })

  expect(logoutButton)
    .toHaveTextContent('Logout')

  fireEvent.click(addEntryButton)

  expect(addEntryButton).toHaveClass('active')
})
import { MockedProvider } from '@apollo/client/testing'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { List } from '../List'
import '@testing-library/jest-dom/extend-expect'

test('without todo list', () => {
  const mockList: IList = {
    _id: '1',
    title: 'Test Title',
  }


  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <List list={mockList} />
    </MockedProvider>
  )

  expect(screen.getByRole('heading', { name: /test title/i })).toBeTruthy()
  expect(screen.getByTestId('deleteList')).toBeInTheDocument()
})

test('with todo list', () => {
  const mockList: IList = {
    _id: '1',
    title: 'Test Title',
    todos: {
      data: [
        {
          _id: '1',
          title: 'item 1',
          completed: false
        },
        {
          _id: '2',
          title: 'item 2',
          completed: true
        }
      ]
    }
  }

  render(
    <MockedProvider>
      <List list={mockList} />
    </MockedProvider>
  )

  expect(screen.getByRole('heading', { name: /test title/i })).toBeInTheDocument()
  expect(screen.getByText('item 1')).toBeInTheDocument()
  expect(screen.getByText('item 2')).toBeInTheDocument()
})